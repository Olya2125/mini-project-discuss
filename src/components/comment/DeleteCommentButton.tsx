'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { deleteComment } from '@/app/actions/comments';
import styles from '@/components/styles.module.css';
import ConfirmModal from '@/components/ConfirmModal';

const DeleteCommentButton: React.FC<{ commentId: string }> = ({ commentId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteComment = async () => {
    try {
      await deleteComment(commentId);
      router.refresh(); // Обновляем страницу после удаления комментария
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
};

export default DeleteCommentButton;
