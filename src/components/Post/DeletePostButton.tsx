'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/actions/posts';
import styles from '@/components/styles.module.css';
import ConfirmModal from '@/components/ConfirmModal';

const DeletePostButton: React.FC<{ postId: string }> = ({ postId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
      router.refresh(); // Обновляем страницу после удаления поста
    } catch (error) {
      console.error('Error deleting post:', error);
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
        title="Delete Post"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeletePost}
      />
    </>
  );
};

export default DeletePostButton;
