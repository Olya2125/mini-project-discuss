'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { deleteTopic } from '@/app/actions/topics';
import { useSession } from 'next-auth/react';
import styles from '@/components/styles.module.css';
import ConfirmModal from '@/components/ConfirmModal';

interface DeleteTopicButtonProps {
  slug: string;
}

export default function DeleteTopicButton({ slug }: DeleteTopicButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteClick = () => {
    if (!session?.user) {
      setError('You must be logged in to delete topics');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDeleteTopic = async () => {
    try {
      await deleteTopic(slug);
      router.push('/');
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  return (
    <>
      <Button
        className={styles.btn_delete}
        size="lg"
        radius="sm"
        onClick={handleDeleteClick}
      >
        Delete 
      </Button>
      {error && <p className={styles.error_message}>{error}</p>}
      {session?.user && (
        <ConfirmModal
          title="Delete Topic"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteTopic}
        />
      )}
    </>
  );
}
