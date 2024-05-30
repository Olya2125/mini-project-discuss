'use client';

import React, { useState } from 'react';
import { Avatar, Button } from '@nextui-org/react';
import styles from '@/components/styles.module.css';
import CreateCommentComponent from '@/components/comment/CreateCommentComponent';

interface CommentTreeProps {
  comment: any;
  postId: string;
}

const CommentTree: React.FC<CommentTreeProps> = ({ comment, postId }) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  return (
    <div className={styles.border}>
      <div className={styles.comment_one}>
        <Avatar />
        <div className={styles.comment_one_info}>
          <h3>{comment.user.name}</h3>
          <p>{comment.content}</p>
          <button
            className={styles.reply}
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
          >
            Reply
          </button>
        </div>
      </div>
      {replyingTo === comment.id && (
        <div className={styles.reply_form}>
          <CreateCommentComponent postId={postId} parentId={comment.id} />
        </div>
      )}
      {comment.children && comment.children.map((child: any) => (
        <CommentTree key={child.id} comment={child} postId={postId} />
      ))}
    </div>
  );
};

export default CommentTree;
