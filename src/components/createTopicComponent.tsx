'use client';

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import ModalWindow from '@/components/modalWindow';
import TopicInput from '@/components/TopicInput';
import { createTopic } from '@/app/actions';

const CreateTopicComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTopic = async () => {
    try {
      const formData = new FormData();
      formData.append('slug', slug);
      formData.append('description', description);

      const result = await createTopic({ message: '' }, formData);
      console.log(result.message); // Обработка успешного создания темы

      closeModal(); // Закрыть модальное окно после создания темы
    } catch (error) {
      console.error('Ошибка при создании темы:', error);
    }
  };

  return (
    <div>
      <Button onClick={openModal}>New Topic</Button>
      <ModalWindow
        title="Create a Topic"
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        formHandler={handleCreateTopic}
      >
        <TopicInput
          id="slug"
          label="Name"
          placeholder="Name"
          value={slug}
          onChange={setSlug} // Используйте setSlug напрямую
        />
        <TopicInput
          id="description"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={setDescription} // Используйте setDescription напрямую
        />
        <Button onClick={handleCreateTopic}>Submit</Button>
      </ModalWindow>
    </div>
  );
};

export default CreateTopicComponent;
