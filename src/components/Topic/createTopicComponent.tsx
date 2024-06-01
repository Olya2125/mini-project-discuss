"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import ModalWindow from "@/components/modalWindow";
import { createTopic } from "@/app/actions/topics";
import OurInput from "@/components/ourInput";

export default function CreateTopicComponent() {
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

      if (result.message === 'Topic created successfully') {
        setSlug('');
        setDescription('');
        closeModal();
        window.location.reload();
      } else {
        console.error(result.message);
      }
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
          onChange={(e) => setSlug(e.target.value)}
        />
        <OurInput
          id="description"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </ModalWindow>
    </div>
  );
}
