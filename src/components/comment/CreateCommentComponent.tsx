'use client';

import React, { useState } from 'react';
import { Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { createComment } from '@/app/actions/comments';
import { useSession } from 'next-auth/react';
import styles from '@/components/styles.module.css';

interface CreateCommentComponentProps {
  postId: string;
  parentId?: string | null;
}

export default function CreateCommentComponent({ postId, parentId = null }: CreateCommentComponentProps) {
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const { data: session } = useSession();

  const closeNotification = () => {
    setNotification(null);
    window.location.reload();
  };

  const handleCreateComment = async () => {
    if (!session?.user?.id) {
      console.error('User not authenticated');
      setNotification({ type: 'error', message: 'User not authenticated' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('userId', session.user.id);
      formData.append('postId', postId);
      if (parentId) {
        formData.append('parentId', parentId);
      }

      const result = await createComment({ message: '' }, formData);
      console.log(result.message);

      if (result.message === 'Comment created successfully') {
        setContent(''); 
        setNotification({ type: 'success', message: 'Comment created successfully' });
      } else {
        console.error(result.message);
        setNotification({ type: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      setNotification({ type: 'error', message: 'Error creating comment' });
    }
  };

  return (
    <div>
      <Textarea
        placeholder="Enter your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
      />
      <Button
        className={styles.btn_comment}
        color="primary"
        variant="solid"
        size="md"
        radius="sm"
        type="submit"
        onClick={handleCreateComment}
      >
        Add Comment
      </Button>
      {notification && (
        <Modal isOpen={!!notification} onClose={closeNotification}>
          <ModalContent>
            <ModalHeader>{notification.type === 'success' ? 'Success' : 'Error'}</ModalHeader>
            <ModalBody>
              <p>{notification.message}</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={closeNotification}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
