'use server';

import React from 'react';
import { getPopularPosts } from '@/app/actions/posts';
import PostCard from './PostCard';
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
  };
}

export default async function PopularPosts() {
  const popularPosts = await getPopularPosts();

  if (!Array.isArray(popularPosts)) {
    return <div>Error loading popular posts</div>;
  }

  return (
    <div className={styles.toppost}>
      <div className={styles.postmain}>
        <div className={styles.alltitle}>
          <h3>Top posts</h3>
          {popularPosts.map((post: Post) => (
            <PostCard
              key={post.id}
              id={post.id}
              slug={post.topic.slug}
              title={post.title}
              author={post.user.name || 'Unknown'}
              comments={`${post.comments.length} comments`}
              showDeleteButton={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
