"use client";

import React, { useState, useEffect } from "react";
import { Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import ModalWindow from "@/components/modalWindow";
import { createPost, updatePost } from "@/app/actions/posts";
import { useSession } from "next-auth/react";
import OurInput from "@/components/ourInput";
import styles from "@/components/styles.module.css";

interface CreatePostComponentProps {
  topicId: string;
  postId?: string;
  initialTitle?: string;
  initialContent?: string;
}

export default function CreatePostComponent({
  topicId,
  postId = "",
  initialTitle = "",
  initialContent = "",
}: CreatePostComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const openModal = () => {
    if (!session?.user) {
      setNotification({ type: 'error', message: 'You must be logged in to perform this action' });
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const closeNotification = () => {
    setNotification(null);
    window.location.reload();
  };

  const handleSavePost = async (e: React.FormEvent) => {
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

      let result;
      if (postId) {
        formData.append("postId", postId);
        result = await updatePost({ message: "" }, formData);
      } else {
        result = await createPost({ message: "" }, formData);
      }

      if (result.errors) {
        setErrors(result.errors);
        return;
      }

      if (result.message.includes("successfully")) {
        setTitle("");
        setContent("");
        closeModal();
        setNotification({ type: "success", message: result.message });
      } else {
        console.error(result.message);
        setNotification({ type: "error", message: result.message });
      }
    } catch (error) {
      console.error("Error saving post:", error);
      setNotification({ type: "error", message: "Error saving post" });
    }
  };

  return (
    <div>
      <Button
        color="primary"
        variant="solid"
        size="lg"
        radius="sm"
        type="button"
        onClick={openModal}
        className={postId ? styles.btn_delete : styles.btn_create}
      >
        {postId ? "Edit Post" : "Create Post"}
      </Button>
      <ModalWindow
        title={postId ? "Edit Post" : "Create Post"}
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        formHandler={handleSavePost}
      >
        <OurInput
          id="title"
          label="Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          errorMessage={errors.title}
        />
        <Textarea
          id="content"
          label="Content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          errorMessage={errors.content}
          style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
        />
        {errors.content && <p className={styles.error_message} style={{ color: 'red', marginTop: '4px' }}>{errors.content}</p>}
      </ModalWindow>
      {notification && (
        <Modal isOpen={!!notification} onClose={closeNotification}>
          <ModalContent>
            <ModalHeader>{notification.type === "success" ? "Success" : "Error"}</ModalHeader>
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
