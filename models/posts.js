const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: String,
  body: Number,
  time: Number,
  userid: Number

})

module.exports = mongoose.model('Posts', postSchema)
