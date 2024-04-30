import React from "react";
import "..//header/header.css";

function PostListView({ title }: { title: string }) {
  const posts = [
    {
      title: "javascript",
      id: 1,
      text: "Here you can discuss all things javascript. Share your projects, ask questions, and help others.",
    },
  ];

  return (
    <div className="topics">
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
}

export default PostListView;
