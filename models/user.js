const mongoose = require("mongoose")
// const Friend = require('./friend')
// const FriendRequest = require('./friendRequest')

const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

//* determines how much processing time it will take to perform the hash
const SALT_ROUNDS = 6  // 6 is a reasonable value

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
  },
  profile: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Profile'
  }
}, {
  timestamps: true,
  // ? I think this determines the output of a built-in instance-level function
  // ? here, it is making sure the password is removed before returning JSON of the "user" instance to wherever userInstance.toJSON was called
  toJSON: function (doc, ret)
  {
    delete ret.password
    return ret
  }
})

//* Pre Hook
userSchema.pre('save', async function (next)
{
  // if password was NOT modified continue to the next middleware
  if (!this.isModified('password')) return next()

  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  return next()
})

// userSchema.methods.addFriend = async function (friendId)
// {
//   console.log('INVOKED ADD FRIEND')
//   // create new friend
//   const friend = await Friend.create({ user_1: this._id, user_2: friendId })
//   // remove friend request

//   return friend
// }

module.exports = mongoose.model("User", userSchema)
