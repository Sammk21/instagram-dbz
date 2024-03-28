"use client";
import PostCard from "@/modules/PostCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:9000");

    socket.on("initialPosts", (initialPosts) => {
      setPosts(initialPosts);
    });

    socket.on("likeUpdated", ({ postId, likes }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes } : post
        )
      );
    });
    fetchPosts();

    // Clean up socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLikeClick = async (postId) => {
    console.log("clicked");
    try {
      await axios.post(`http://localhost:9000/api/posts/${postId}/like`);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
      <div className="min-h-screen gap-10">
        {posts.map((post) => (
          <PostCard handleLike={handleLikeClick} post={post} key={post._id} />
        ))}
      </div>
      <AddPost />
    </main>
  );
}
/* eslint-disable jsx-a11y/anchor-is-valid */

function AddPost() {
  return (
    <>
      <Link href={"/addpost"} className=" fixed bottom-0">
        <div className="w-28 h-28 bg-[#000] rounded-full flex justify-center items-center">
          add post
        </div>
      </Link>
    </>
  );
}
