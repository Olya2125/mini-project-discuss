"use client";

import React, { useState } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import ModalWindow from "@/components/modalWindow";
import { createPost } from "@/app/actions/posts";
import { useSession } from "next-auth/react";
import OurInput from "@/components/ourInput";
import styles from "@/components/styles.module.css";

interface CreatePostComponentProps {
  topicId: string;
}

export default function CreatePostComponent({
  topicId,
}: CreatePostComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const { data: session } = useSession();

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

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!session?.user?.id) {
      console.error("User not authenticated");
      setNotification({ type: "error", message: "User not authenticated" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("userId", session.user.id);
      formData.append("topicId", topicId);

      const result = await createPost({ message: "" }, formData);
      if (result.errors) {
        setErrors(result.errors);
        return;
      }

      if (result.message === "Post created successfully") {
        setTitle("");
        setContent("");
        closeModal();
        setNotification({
          type: "success",
          message: "Post created successfully",
        });
      } else {
        console.error(result.message);
        setNotification({ type: "error", message: result.message });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setNotification({ type: "error", message: "Error creating post" });
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
          errorMessage={errors.title}
        />
        <OurInput
          id="content"
          label="Content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          errorMessage={errors.content}
        />
      </ModalWindow>
      {notification && (
        <Modal isOpen={!!notification} onClose={closeNotification}>
          <ModalContent>
            <ModalHeader>
              {notification.type === "success" ? "Success" : "Error"}
            </ModalHeader>
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
