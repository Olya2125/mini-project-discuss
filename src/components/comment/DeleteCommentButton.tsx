'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
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
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteComment = async () => {
    try {
      await deleteComment(commentId);
      router.refresh();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <Button
        className={styles.btn_del_comment}

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
