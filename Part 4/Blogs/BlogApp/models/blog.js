//I define the mongoose schema for blogs
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, { _id: true });

module.exports = mongoose.model('Blog', blogSchema)