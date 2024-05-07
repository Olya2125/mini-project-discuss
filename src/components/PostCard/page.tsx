import React from "react";
import { Link } from "@nextui-org/react";
import styles from "@/components/styles.module.css";


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
    <div className={styles.postcard} >
      <Link href="/viewPost">
        <div className={styles.post}>
          <h3 className={styles.post_title}>{title}</h3>
          <div className={styles.post_flex}>
          <span >By: {author}</span>
          <p className={styles.post_comments}>{comments}</p>
          </div>
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
      comments: "20 comments",
    },

    {
      id: 2,
      title: "Making in app",
      author: "Ramaz",
      comments: "10 comments",
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
