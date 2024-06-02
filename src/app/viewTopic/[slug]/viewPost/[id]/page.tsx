import React from 'react';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import CreateCommentComponent from '@/components/comment/CreateCommentComponent';
import CommentTree from '@/components/comment/CommentTree';
import styles from '@/components/styles.module.css';
import BackButton from '@/components/backButton/page';

export default async function ViewPost(props: any) {
  const { id, slug } = props.params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await db.post.findUnique({
    where: { id },
    include: {
      user: true,
      topic: true,
      comments: {
        where: { parentId: null },
        include: {
          user: true,
          children: {
            include: {
              user: true,
              children: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <SessionProvider>
      <BackButton />
      <div>
        <div className="flex flex-col items-center p-10">
          <h3 className={styles.alltitle}>{post.title}</h3>
          <p className={styles.application}>{post.content}</p>
          <CreateCommentComponent postId={post.id} />
        </div>
        <div>
          <p className={styles.application_comments}>
            All {post.comments.length} comments
          </p>
          {post.comments.map((comment) => (
            <CommentTree key={comment.id} comment={comment} postId={post.id} />
          ))}
        </div>
      </div>
    </SessionProvider>
  );
}
