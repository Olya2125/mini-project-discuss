'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import ModalWindow from '@/components/modalWindow';
import { createPost } from '@/app/actions/posts';
import { useSession } from 'next-auth/react';
import OurInput from "@/components/ourInput";
import styles from '@/components/styles.module.css';

const CreatePostComponent: React.FC<{ topicId: string }> = ({ topicId }) => {
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
      console.error('Пользователь не аутентифицирован');
      return;
    }

    try {
      console.log('Форма данных:', { title, content, userId: session.user.id, topicId });
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userId', session.user.id);  
      formData.append('topicId', topicId);

      const result = await createPost({ message: '' }, formData);
      console.log(result.message); 

      if (result.message === 'Пост успешно создан') {
        closeModal();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
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
          onChange={setTitle}
        />
        <OurInput 
          id="content"
          label="Content"
          placeholder="Content"
          value={content}
          onChange={setContent}
        />
      </ModalWindow>
    </div>
  );
};

export default CreatePostComponent;
