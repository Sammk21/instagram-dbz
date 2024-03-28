// CommentForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

function CommentForm({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Set up Socket.IO connection
    const socket = io("http://localhost:9000");

    // Listen for "commentAdded" event
    socket.on("commentAdded", ({ postId: updatedPostId, comment }) => {
      if (updatedPostId === postId) {
        // Add the new comment to the comments array
        setComments((prevComments) => [...prevComments, comment]);
      }
    });

    // Clean up function to disconnect Socket.IO
    return () => {
      socket.disconnect();
    };
  }, [postId]); // Reconnect socket when postId changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:9000/api/posts/${postId}/comment`,
        { text }
      );
      console.log("Comment added:", response.data.post.comment);
      // Clear the input field after submitting the comment
      setText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      {/* Display existing comments */}
      <ul className="text-black px-4 text-xs">
        {comments.map((comment, index) => (
          <li key={index}>
            <span className="font-bold  ">test</span> {comment.text}
          </li>
        ))}
      </ul>

      {/* Comment form */}
      <form className="px-3 flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="text-black w-full border "
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="bg-black text-white p-2 rounded-md" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
