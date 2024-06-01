'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import ModalWindow from '@/components/modalWindow';
import { createPost } from '@/app/actions/posts';
import { useSession } from 'next-auth/react';
import OurInput from "@/components/ourInput";
import styles from '@/components/styles.module.css';

interface CreatePostComponentProps {
  topicId: string;
}

export default function CreatePostComponent({ topicId }: CreatePostComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePost = async () => {
    console.log('handleCreatePost called'); 

    if (!session?.user?.id) {
      console.error('User not authenticated');
      return;
    }

    try {
      console.log('Form data:', { title, content, userId: session.user.id, topicId });
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userId', session.user.id);  
      formData.append('topicId', topicId);

      const result = await createPost({ message: '' }, formData);
      console.log(result.message); 

      if (result.message === 'Post created successfully') {
        setTitle('');
        setContent('');
        closeModal();
        window.location.reload();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <Button
        color="primary"
        variant="solid"
        size="lg"
        radius="sm"
        type="submit"
        onClick={openModal}
        className={styles.btn_create}
      >
        Create post
      </Button>
      <ModalWindow
        title="Create Post"
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        formHandler={handleCreatePost}
      >
        <OurInput 
          id="title"
          label="Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <OurInput 
          id="content"
          label="Content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </ModalWindow>
    </div>
  );
}
