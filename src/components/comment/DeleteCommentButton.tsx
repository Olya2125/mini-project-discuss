'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { deleteComment } from '@/app/actions/comments';
import styles from '@/components/styles.module.css';
import ConfirmModal from '@/components/ConfirmModal';

interface DeleteCommentButtonProps {
  commentId: string;
}

export default function DeleteCommentButton({ commentId }: DeleteCommentButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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
      <Button
        className={styles.btn_del}
        color="primary"
        size="sm"
        radius="sm"
        variant="ghost"
        onClick={() => setIsModalOpen(true)}
      >
        Delete
      </Button>
      <ConfirmModal
        title="Delete Comment"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteComment}
      />
    </>
  );
}
