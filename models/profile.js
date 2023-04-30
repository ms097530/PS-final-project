const mongoose = require('mongoose')
const Profile = require('./profile')

const Schema = mongoose.Schema

const profileSchema = new Schema({
    user:
    {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    headline:
    {
        type: String,
        default: '',
        trim: true
    },
    profileImgUrl:
    {
        type: String,
        default: 'https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png',
        trim: true
    },
    bannerImgUrl:
    {
        type: String,
        default: 'https://www.digital-learning.fse.manchester.ac.uk/wp-content/themes/uom-theme/assets/images/default-banner.jpg',
        trim: true
    },
    faveSongUrl:
    {
        type: String,
        trim: true
    },
    // ? may be better to move friends and friendRequsts into their own schemas in the future to eliminate risks of unbound array?
    // friends:
    //     [
    //         {
    //             type: mongoose.SchemaTypes.ObjectId,
    //             ref: 'User'
    //         }
    //     ],
    // friendRequests:
    //     [
    //         {
    //             type: mongoose.SchemaTypes.ObjectId,
    //             ref: 'User'
    //         }
    //     ]
})

profileSchema.methods.addFriend = async function (friendId)
{
    // * anticipating friendId coming in as a String

    // TODO: handle errors when manipulating instance as to make sure that if the operation fails neither profile gets changed

    // find each profile and add to friends array
    this.friends.push(mongoose.Types.ObjectId(friendId))
    const friendProfile = await Profile.find({ userId: mongoose.Types.ObjectId(friendId) })
    friendProfile.friends.push(this._id)

    // remove friend reqeust from each profile's requests
    // * does not affect a user who didn't have a request (i.e. only one user should have a request)
    this.friendRequests = this.friendRequests.filter(
        friend => friend._id.toString() !== friendId.toString()
    )
    friendProfile.friendRequests = friendProfile.friendRequests.filter(
        friend => friend._id.toString() !== this._id.toString()
    )

    await friendProfile.save()
    return this.save()
}

profileSchema.methods.removeFriend = async function (friendId)
{
    // * anticipating friendId coming in as a String

    // TODO: handle errors when manipulating instance as to make sure that if the operation fails neither profile gets changed

    // find matching friend reference in friends array of this profile and remove it
    console.log(this.friends)
    this.friends = this.friends.filter(
        friend => friend._id.toString() !== friendId.toString()
    )
    console.log(this.friends)
    // then, find the friend that was removed and remove the current user from that friend's friends array
    const friendProfile = await Profile.find({ userId: mongoose.Types.ObjectId(friendId) })
    console.log(friendProfile)
    console.log(friendProfile.friends)
    friendProfile.friends = friendProfile.friends.filter(
        friend => friend._id.toString() !== this._id.toString()
    )
    console.log(friendProfile.friends)

    // save the user's updated profile and the former friend's updated profile
    await friendProfile.save()
    return this.save()
}

module.exports = mongoose.model("Profile", profileSchema)