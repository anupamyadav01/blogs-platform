const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blog",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  like: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);
module.exports = CommentModel;
