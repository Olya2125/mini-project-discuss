// src/components/Post/PopularPosts.tsx
'use server';

import React from 'react';
import { getPopularPosts } from '@/app/actions/posts';
import PostCard from './PostCard/page';
import styles from '@/components/styles.module.css';

export default async function PopularPosts() {
  const popularPosts = await getPopularPosts();

  return (
    <div className={styles.toppost}>
      <div className={styles.postmain}>
        <div className={styles.alltitle}>
          <h3>Top posts</h3>
          {popularPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              slug={post.topic.slug}
              title={post.title}
              author={post.user.name || 'Unknown'}
              comments={`${post.comments.length} comments`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
