import React from 'react';
import PostCard from '@/components/Post/PostCard/page';
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
  topic: {
    slug: string;
  }
}

interface PostListProps {
  posts: Post[];
  showDeleteButton?: boolean;
}

export default function PostList({ posts, showDeleteButton = true }: PostListProps) {
  return (
    <div className={styles.postmain}>
      <div>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            slug={post.topic.slug}
            title={post.title}
            author={post.user.name || 'Unknown'}
            comments={`${post.comments.length} comments`}
            showDeleteButton={showDeleteButton}
          />
        ))}
      </div>
    </div>
  );
}
