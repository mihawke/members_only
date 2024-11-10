const mongoose = require("../config/db")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    membershipStatus: {
        type: Boolean,
        default: false
      }
})
const User = mongoose.model('User', userSchema)

module.exports = User;