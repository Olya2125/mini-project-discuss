import React from 'react';
import PostCard from '../PostCard/page';
import styles from '@/components/styles.module.css';

interface Post {
  id: string;
  title: string;
  user: {
    name: string | null; 
  };
  comments: {
    length: number;
  };
}

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={styles.postmain}>
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            author={post.user.name || 'Unknown'} 
            comments={`${post.comments.length} comments`}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;

