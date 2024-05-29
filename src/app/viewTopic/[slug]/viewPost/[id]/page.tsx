import React from 'react';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import styles from '@/components/styles.module.css';

export default async function ViewPost(props: any) {
  const { id, slug } = props.params;
  const post = await db.post.findUnique({
    where: { id },
    include: {
      user: true,
      topic: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className={styles.postDetail}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div>
        <h3>Author: {post.user.name}</h3>
        <h3>Topic: {post.topic.slug}</h3>
      </div>
      <div>
        <h3>Comments</h3>
        {post.comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <small>by {comment.user.name}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
