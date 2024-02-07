const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required who posted the comment"]
  },
  comment: {
    type: String,
    required: [true, "cannot add empty comment"]
  },
})

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "who posted username required"],
  },
  content: {
    type: String,
    required: [true, "cannot post empty content"],
  },
  comments: {
    type: [subSchema],
  }
});

module.exports = mongoose.model('Post', postSchema)
