import React from "react";
import { Link } from "@nextui-org/react";

function Post({
  title,
  author,
  comments,
}: {
  title: string,
  author: string,
  comments: string
}) {
  return (
    <div className="postcard">
      <Link href="/viewTopic">
        <div className="post">
          <h3>{title}</h3>
          <span>By: {author}</span>
          <p>{comments}</p>
        </div>
      </Link>
    </div>
  );
}

function PostCard({ title }: { title: string }) {
  const postList = [
    {
      id: 1,
      title: "Implementing Charts",
      author: "wpa",
      comments: "",
    },

    {
      id: 2,
      title: "Making in app",
      author: "Ramaz",
      comments: "",
    },
  ];
  return (
    <div>
      <h2>{title}</h2>
      <>
        {postList.map(({ title, author, comments }) => {
          return <Post title={title} author={author} comments={comments} />;
        })}
      </>
    </div>
  );
}

export default PostCard;
