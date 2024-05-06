import React from "react";
import { Link } from "@nextui-org/react";
import "..//header/header.css";

function TopicsSidebar({ title }: { title: string }) {
  const posts = [
    { id: 1, name: "javascript" },
    { id: 2, name: "golang" },
    { id: 3, name: "servers" },
    { id: 4, name: "webdev" },
  ];

  return (
    <div className="topics">
      <h3 className="topic">{title}</h3>
      {posts.map((post) => (
        <ul key={post.id}>
          <Link>
            <li className="link">{post.name}</li>
          </Link>
        </ul>
      ))}
    </div>
  );
}

export default TopicsSidebar;
