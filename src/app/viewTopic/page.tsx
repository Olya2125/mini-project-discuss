import Header from "@/components/header/page";
import React from "react";
import { Button } from "@nextui-org/react";
import PostListView from "@/components/listTopicView/page";
import PostList from "@/components/PostList/page";
import styles from "@/components/styles.module.css";


export default function ViewTopic() {
  return (
    <div>
      <Header />
      <div className={styles.main_head}>
      <div className={styles.postmain}>
        <div className={styles.alltitle}>
          <PostList title="React" />
          </div>
        </div>
        <div className={styles.t}>
          <Button className={styles.button}>Create Post</Button>

          <PostListView title="" />
        </div>
      </div>
    </div>
  );
}
