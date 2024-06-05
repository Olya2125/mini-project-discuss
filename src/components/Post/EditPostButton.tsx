"use client";

import React, { useState } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updatePost } from "@/app/actions/posts";
import OurInput from "@/components/ourInput";
import styles from "@/components/styles.module.css";

interface EditPostButtonProps {
  postId: string;
  initialTitle: string;
  initialContent: string;
}

export default function EditPostButton({ postId, initialTitle, initialContent }: EditPostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const openModal = () => {
    if (!session?.user) {
      setNotification({ type: 'error', message: 'You must be logged in to edit posts' });
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

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("postId", postId);

      const result = await updatePost({ message: "" }, formData);

      if (result.errors) {
        setErrors(result.errors);
      } else {
        setTitle('');
        setContent('');
        closeModal();
        setNotification({ type: 'success', message: 'Post updated successfully' });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setNotification({ type: 'error', message: 'Error updating post' });
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
        className={styles.btn_del}
      >
        Edit
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        placement="top-center"
        className={styles.create_modal}
      >
        <ModalContent>
          <form onSubmit={handleSavePost}>
            <ModalHeader>Edit Post</ModalHeader>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <Button type="submit" className={styles.btn_chanel}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
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
