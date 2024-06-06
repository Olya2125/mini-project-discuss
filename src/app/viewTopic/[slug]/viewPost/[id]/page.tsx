import React from 'react';
import { notFound } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import CreateCommentComponent from '@/components/comment/CreateCommentComponent';
import CommentTree from '@/components/comment/CommentTree';
import styles from '@/components/styles.module.css';
import BackButton from '@/components/backButton/page';
import DeletePostButton from '@/components/Post/DeletePostButton';
import CreatePostComponent from '@/components/Post/CreatePostComponent';
import { getNestedCommentsFromDB } from '@/db/comments';
import { db } from '@/db';
import type { Comment } from '@/db/comments';

export default async function ViewPost(props: any) {
  const { id, slug } = props.params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await db.post.findUnique({
    where: { id },
    include: {
      user: true,
      topic: true,
    },
  });

  if (!post) {
    return notFound();
  }

  const comments: Comment[] = await getNestedCommentsFromDB(post.id);

  return (
    <SessionProvider>
      <BackButton />
      <div>
        <div className="flex flex-col items-center p-10">
          <h3 className={styles.alltitle}>{post.title}</h3>
          <p className={styles.application} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{post.content}</p>
          <div className="flex space-x-2">
            <CreatePostComponent
              postId={post.id}
              initialTitle={post.title}
              initialContent={post.content}
              topicId={post.topic.id}
            />
            <DeletePostButton postId={post.id} topicSlug={slug} />
          </div>
          <CreateCommentComponent postId={post.id} />
        </div>
        <div className={styles.commentsContainer}>
          <p className={styles.application_comments}>
            Comments
          </p>
          {comments.map((comment) => (
            <CommentTree key={comment.id} comment={comment} postId={post.id} />
          ))}
        </div>
      </div>
    </SessionProvider>
  );
}
