'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteComment } from '@/app/actions/comments';
import { useSession } from 'next-auth/react';
import styles from '@/components/styles.module.css';
import ConfirmModal from '@/components/ConfirmModal';

interface DeleteCommentButtonProps {
  commentId: string;
}

export default function DeleteCommentButton({ commentId }: DeleteCommentButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteClick = () => {
    if (!session?.user) {
      setError('You must be logged in to delete comments');
    } else {
      setIsModalOpen(true);
      setError(null);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(commentId);
      router.refresh();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <>
      <button
        className={styles.btn_del_comment}
        onClick={handleDeleteClick}
      >
        Delete
      </button>
      {error && <p className={styles.error_message} style={{ marginTop: '8px', color: 'red' }}>{error}</p>}
      {session?.user && (
        <ConfirmModal
          title="Delete Comment"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteComment}
        />
      )}
    </>
  );
}
