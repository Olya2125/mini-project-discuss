"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import ModalWindow from "@/components/modalWindow";
import { createTopic } from "@/app/actions/topics";
import OurInput from "@/components/ourInput";

const CreateTopicComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTopic = async () => {
    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("description", description);

      const result = await createTopic({ message: "" }, formData);
      console.log(result.message);

      closeModal(); 
    } catch (error) {
      console.error("Ошибка при создании темы:", error);
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
      >
        New Topic
      </Button>
      <ModalWindow
        title="Create a Topic"
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        formHandler={handleCreateTopic}
      >
        <OurInput
          id="slug"
          label="Name"
          placeholder="Name"
          value={slug}
          onChange={setSlug} // Используйте setSlug напрямую
        />
        <OurInput
          id="description"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={setDescription} // Используйте setDescription напрямую
        />
      </ModalWindow>
    </div>
  );
};

export default CreateTopicComponent;
