import React from "react";
import { Link } from "@nextui-org/react";
import PostCard from "../PostCard/page";


function PostList({ title }: { title: string }) {

  return (
    <div className="postmain">
      <h1 className="alltitle">{title}</h1>
      <div>
      <PostCard title=""/>
      </div>
    </div>
  );
}

export default PostList;
