'use client';

import React, { useState } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import { createComment } from '@/app/actions/comments';
import { useSession } from 'next-auth/react';

const CreateCommentComponent: React.FC<{ postId: string, parentId?: string | null }> = ({ postId, parentId = null }) => {
  const [content, setContent] = useState('');
  const { data: session } = useSession();

  const handleCreateComment = async () => {
    if (!session?.user?.id) {
      console.error('User not authenticated');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('userId', session.user.id);
      formData.append('postId', postId);
      if (parentId) {
        formData.append('parentId', parentId);
      }

      const result = await createComment({ message: '' }, formData);
      console.log(result.message);

      if (result.message === 'Comment created successfully') {
        setContent('');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div>
      <Textarea
        placeholder="Enter your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="my-4"
      />
      <Button
        color="primary"
        variant="solid"
        size="md"
        radius="sm"
        type="submit"
        onClick={handleCreateComment}
      >
        Add Comment
      </Button>
    </div>
  );
};

export default CreateCommentComponent;
