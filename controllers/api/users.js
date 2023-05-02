//* Request handler Logic
const User = require('../../models/user');
const Profile = require('../../models/profile')
const Friend = require('../../models/friend')
const FriendRequest = require('../../models/friendRequest')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//* /*-- Helper Functions --*/
function createJWT(user)
{
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
}

async function create(req, res)
{
    // console.log('[From POST handler]', req.body)
    try
    {
        //* creating a new user and associating new profile with the created user
        const user = await User.create(req.body);
        const userProfile = await Profile.create({ user: user._id })
        // console.log(user);
        console.log(userProfile)

        //* creating a new jwt
        const token = createJWT(user);

        res.json(token);

    } catch (error)
    {
        console.log(error);
        res.status(400).json(error)
    }
}


async function login(req, res)
{
    try
    {
        // find user in db
        const user = await User.findOne({ email: req.body.email });
        // check if we found an user
        if (!user) throw new Error();
        // compare the password to hashed password
        const match = await bcrypt.compare(req.body.password, user.password);
        // check is password matched
        if (!match) throw new Error();
        // send back a new token with the user data in the payload
        res.json(createJWT(user));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

async function search(req, res)
{
    // return users in db with name that starts with query name
    // * if no name is provided, '' will make sure all users are returned - working as index
    // ? uses rooted regex (begins with ^) to take advantage of indexes
    const searchName = req.query.name ? req.query.name.toLowerCase() : ''

    const users = await User.find(
        { name: { $regex: new RegExp('^' + searchName, 'i') } })
        .populate('profile', 'profileImgUrl -_id')

    res.json(users)
}


async function getInfo(req, res)
{
    console.log(req.params)
    // get friends
    if (req.query.type === 'fr')
    {

        if (req.query.friend)
        {
            // console.log('CHECKING IF FRIENDS')
            const friend = await Friend.findOne({
                $or:
                    [
                        { $and: [{ user_1: req.params.id }, { user_2: req.query.friend }] },
                        { $and: [{ user_1: req.query.friend }, { user_2: req.params.id }] }
                    ]
            })

            return res.json(friend ? true : false)
        }

        // console.log('GETTING FRIENDS')
        const friends = await Friend.find(
            // find friend where one of the linked users ids matches param id
            // exclude friend instance _id from results
            { $or: [{ user_1: req.params.id }, { user_2: req.params.id }] }, '-_id')
            // populate users associated with friend instance with only the name and profile
            // then populate the profile with profileImgUrl, exclude profile _id
            .populate(
                {
                    path: 'user_1 user_2',
                    select: 'name profile',
                    populate: {
                        path: 'profile',
                        select: 'profileImgUrl -_id'
                    }
                })

        return res.json(friends)
    }

    // get friend requests
    if (req.query.type === 'freq')
    {
        if (req.query.user)
        {
            // console.log('CHECKING IF FRIENDS')
            const friendReq = await FriendRequest.findOne({
                $or:
                    [
                        { $and: [{ from: req.params.id }, { to: req.query.user }] },
                        { $and: [{ from: req.query.user }, { to: req.params.id }] }
                    ]
            })

            // is there a friend request between the two?
            const status = !friendReq ? false : true
            // if so, assign from to id request came from
            const from = friendReq ? friendReq.from : null

            return res.json({ status, from })
        }

        // console.log('GETTING FRIEND REQUESTS')
        const friendRequests = await FriendRequest.find({ $or: [{ from: req.params.id }, { to: req.params.id }] }).populate('from to', 'name')
        return res.json(friendRequests)
    }


    // * DEFAULT: get matching user profile and user name/id
    // console.log('GETTING USER DATA')
    const profile = await Profile.findOne({ user: req.params.id }).populate('user', 'name')
    console.log(profile)
    return res.json(profile)
}

// ? create separate route and controller for friend operations and keep this for general updates?
// * refactoring user model should make updates easier - no longer need to worry about updating or not updating friends/requests
async function update(req, res)
{

}

async function addFriend(req, res)
{
    res.json('ADD FRIEND')
}

async function addFriendRequest(req, res)
{
    res.json('ADD FRIEND REQUEST')
}

async function removeFriend(req, res)
{
    res.json('REMOVE FRIEND')
}

async function removeFriendRequest(req, res)
{
    res.json('REMOVE FRIEND REQUEST')
}



async function checkToken(req, res)
{
    console.log(req.user);
    res.json(req.exp)
}


module.exports = {
    create,
    login,
    search,
    getInfo,
    update,
    addFriend,
    addFriendRequest,
    removeFriend,
    removeFriendRequest,
    checkToken
}