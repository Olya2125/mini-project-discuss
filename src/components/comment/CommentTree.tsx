'use client';

import React, { useState } from 'react';
import { Avatar } from '@nextui-org/react';
import styles from '@/components/styles.module.css';
import CreateCommentComponent from '@/components/comment/CreateCommentComponent';
import DeleteCommentButton from '@/components/comment/DeleteCommentButton';
import type { Comment } from '@/db/comments';

interface CommentTreeProps {
  comment: Comment;
  postId: string;
}

export default function CommentTree({ comment, postId }: CommentTreeProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  return (
    <div className={styles.border}>
      <div className={styles.comment_one}>
        <Avatar />
        <div className={styles.comment_one_info}>
          <h3 className={styles.user}>{comment.user?.name || 'Unknown'}</h3>
          <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{comment.content}</p>
          <button
            className={styles.reply}
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
          >
            Reply
          </button>
          <DeleteCommentButton commentId={comment.id} />
        </div>
      </div>
      {replyingTo === comment.id && (
        <div className={styles.reply_form}>
          <CreateCommentComponent postId={postId} parentId={comment.id} />
        </div>
      )}
      {comment.children && comment.children.length > 0 && (
        <div className={styles.children}>
          {comment.children.map((child: Comment) => (
            <CommentTree key={child.id} comment={child} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}
