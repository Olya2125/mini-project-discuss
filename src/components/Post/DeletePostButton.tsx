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
  topicSlug: string;
}

export default function DeletePostButton({ postId, topicSlug }: DeletePostButtonProps) {
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
      router.push('/');
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <button
        className={styles.btn_delete_main}
        onClick={handleDeleteClick}
      >
        Delete
      </button>
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
