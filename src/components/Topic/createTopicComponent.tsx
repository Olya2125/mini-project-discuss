"use client";

import React, { useState } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import ModalWindow from "@/components/modalWindow";
import { createTopic } from "@/app/actions/topics";
import OurInput from "@/components/ourInput";
import styles from "@/components/styles.module.css";

export default function CreateTopicComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ slug?: string; description?: string }>({});
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const closeNotification = () => {
    setNotification(null);
    window.location.reload();
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("description", description);

      const result = await createTopic({ message: "" }, formData);

      if (result.message === 'Topic created successfully') {
        setSlug('');
        setDescription('');
        closeModal();
        setNotification({ type: 'success', message: 'Topic created successfully' });
      } else {
        setErrors(result.errors || {});
      }
    } catch (error) {
      console.error("Error creating topic:", error);
      setNotification({ type: 'error', message: 'Error creating topic' });
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
          errorMessage={errors.slug}
        />
        <OurInput
          id="description"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          errorMessage={errors.description}
        />
      </ModalWindow>
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
