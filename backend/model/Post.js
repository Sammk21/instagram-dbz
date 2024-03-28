// models/Post.js

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: String,
    description: String,
    likes: { type: Number, default: 0 },
    comments: [{ body: String, date: Date, text:String}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
