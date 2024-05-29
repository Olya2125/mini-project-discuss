import React from 'react';
import { Link } from '@nextui-org/react';
import styles from '@/components/styles.module.css';

interface PostProps {
  title: string;
  author: string;
  comments: string;
}

const Post: React.FC<PostProps> = ({ title, author, comments }) => {
  return (
    <div className={styles.postcard}>
      <Link href="/viewPost">
        <div className={styles.post}>
          <h3 className={styles.post_title}>{title}</h3>
          <div className={styles.post_flex}>
            <span>By: {author}</span>
            <p className={styles.post_comments}>{comments}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const PostCard: React.FC<PostProps> = ({ title, author, comments }) => {
  return (
    <div>
      <Post title={title} author={author} comments={comments} />
    </div>
  );
};

export default PostCard;
