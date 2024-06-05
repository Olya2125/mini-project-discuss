"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { deletePost } from "@/app/actions/posts";
import { useSession } from "next-auth/react";
import styles from "@/components/styles.module.css";
import ConfirmModal from "@/components/ConfirmModal";

interface DeletePostButtonProps {
  postId: string;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteClick = () => {
    if (!session?.user) {
      setError('You must be logged in to delete posts');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Button
        className={styles.btn_del}
        size="lg"
        radius="sm"
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
      {error && <p className={styles.error_message}>{error}</p>}
      {session?.user && (
        <ConfirmModal
          title="Delete Post"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeletePost}
        />
      )}
    </>
  );
}
