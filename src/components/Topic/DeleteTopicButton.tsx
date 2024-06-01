'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { deleteTopic } from '@/app/actions/topics';
import styles from '@/components/styles.module.css';
import ConfirmModal from '@/components/ConfirmModal';

const DeleteTopicButton: React.FC<{ slug: string }> = ({ slug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteTopic = async () => {
    try {
      await deleteTopic(slug);
      router.push('/'); // Перенаправление на главную страницу после удаления
    } catch (error) {
      console.error('Error deleting topic:', error);
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
        Delete this topic
      </Button>
      <ConfirmModal
        title="Delete Topic"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteTopic}
      />
    </>
  );
};

export default DeleteTopicButton;
