const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendSchema = new Schema({
    user_1: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    user_2: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Friend', friendSchema)