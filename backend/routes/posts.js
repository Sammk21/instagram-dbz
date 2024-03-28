// routes/posts.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../model/Post");
const socket = require("socket.io");





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage });

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a post
router.post("/", upload.single("image"), async (req, res) => {
  const { description } = req.body;

  // If no image file is provided
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  // Create a new post
  const post = new Post({
    image: req.file.path,
    description: description || "",
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post("/:postId/like", async (req, res) => {
  const postId = req.params.postId;



  try {
    const post = await Post.findById(postId);
    post.likes += 1;
    await post.save();

   req.app.get("io").emit("likeUpdated", { postId, likes: post.likes });

    res.json({ message: "Like added successfully", likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: "Failed to add like", error: err.message });
  }
});


router.post("/:postId/comment", async (req, res) => {
try {
  const postId = req.params.postId;
  const { text,body } = req.body;
  // Create a new comment object with body and current date
  const newComment = {
    text,
    body,
    date: new Date(),
  };

  // Find the post by ID and push the new comment to the comments array
  const post = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: newComment } },
    { new: true }
  );


     req.app.get("io").emit("commentAdded", {
       postId,
       comment: newComment,
     });
  

  res.json({ success: true, message: "Comment saved successfully", post });
} catch (err) {
  console.error(err.message);
  res.status(500).json({ success: false, message: "Server Error" });
}
});

module.exports = router;
