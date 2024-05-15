import React from "react";
import { Link } from "@nextui-org/react";
import PostCard from "../PostCard/page";
import styles from "@/components/styles.module.css";



function PostList({ title }: { title: string }) {

  return (
    <div className={styles.postmain}>
      <h1 >{title}</h1>
      <div>
      <PostCard title=""/>
      </div>
    </div>
  );
}

export default PostList;
