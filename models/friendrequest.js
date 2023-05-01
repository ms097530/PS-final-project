const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendRequestSchema = new Schema({
    from: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('FriendRequest', friendRequestSchema)