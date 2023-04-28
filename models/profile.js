const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model("Profile", profileSchema)