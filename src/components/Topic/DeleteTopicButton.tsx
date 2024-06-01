'use client';

import React from 'react';
import { Button } from '@nextui-org/react';
import { deleteTopic } from '@/app/actions/topics';
import { useRouter } from 'next/navigation';
import styles from '@/components/styles.module.css';

const DeleteTopicButton: React.FC<{ slug: string }> = ({ slug }) => {
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
    <Button
      className={styles.btn_del}
      color="primary"
      size="sm"
      radius="sm"
      variant="ghost"
      onClick={handleDeleteTopic}
    >
      Delete this topic
    </Button>
  );
};

export default DeleteTopicButton;
