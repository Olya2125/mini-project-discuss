import React from 'react';
import { Link } from '@nextui-org/react';
import styles from '@/components/styles.module.css';
import DeletePostButton from '@/components/Post/DeletePostButton';

interface PostProps {
  id: string;
  slug: string;
  title: string;
  author: string;
  comments: string;
}

const Post: React.FC<PostProps> = ({ id, slug, title, author, comments }) => {
  return (
    <div className={styles.postcard}>
      <Link href={`/viewTopic/${slug}/viewPost/${id}`}>
        <div className={styles.post}>
          <h3 className={styles.post_title}>{title}</h3>
          <div className={styles.post_flex}>
            <span>By: {author}</span>
            <p className={styles.post_comments}>{comments}</p>
          </div>
        </div>
      </Link>
      <DeletePostButton postId={id} />
    </div>
  );
};

const PostCard: React.FC<PostProps> = ({ id, slug, title, author, comments }) => {
  return (
    <div>
      <Post id={id} slug={slug} title={title} author={author} comments={comments} />
    </div>
  );
};

export default PostCard;
