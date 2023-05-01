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


async function getInfo(req, res)
{
    // get friends
    if (req.query.type === 'fr')
    {
        const friends = await Friend.find({ $or: [{ user_1: req.params.id }, { user_2: req.params.id }] }).populate('user', 'name')
        return res.json(friends)
    }

    // get friend requests
    if (req.query.type === 'freq')
    {
        const friendRequests = await FriendRequest.find({ $or: [{ from: req.params.id }, { to: req.params.id }] }).populate('user', 'name')
        return res.json(friendRequests)
    }

    // get matching user profile and user name/id
    const profile = await Profile.findOne({ user: req.params.id }).populate('user', 'name')
    console.log(profile)
    return res.json(profile)
}

// ? create separate route and controller for friend operations and keep this for general updates?
async function update(req, res)
{
    // EXPECT op=add_fr OR op=rm_fr for friend operations as query parameters for friend operations

    // find user and matching profile
    const user = await User.findById(req.params.id)
    const profile = await Profile.findOne({ user: req.params.id })

    // ? keep add and remove updates specific to those operations and only do general update without op specification?

    // add friend
    if (req.query.op.toLowerCase() === 'add_fr')
    {
        await profile.addFriend(req.body.friendId)
        return res.json({ message: 'Friend added' })
    }
    // remove friend
    else if (req.query.op.toLowerCase() === 'rm_fr')
    {
        await profile.removeFriend(req.body.friendId)
        return res.json({ message: 'Friend removed' })
    }
    // normal update
    else
    {
        // user = { ...user, req.body.user }
    }
}


async function checkToken(req, res)
{
    console.log(req.user);
    res.json(req.exp)
}


module.exports = {
    create,
    login,
    getInfo,
    checkToken
}