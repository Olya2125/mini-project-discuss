'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/actions/posts';
import { useSession } from 'next-auth/react';
import styles from '@/components/styles.module.css';
import ConfirmModal from '@/components/ConfirmModal';

interface DeletePostButtonProps {
  postId: string;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
      router.refresh();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!session?.user) {
    return null;
  }

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
}
