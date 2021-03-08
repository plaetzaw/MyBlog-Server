const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: Number,
  email: String,
  userid: Number

})

module.exports = mongoose.model('Users', userSchema)
