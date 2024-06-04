'use server';

import { createCommentInDB, deleteCommentFromDB } from '@/db/comments';

export const createComment = async (_prevState: { message: string }, formData: FormData) => {
  try {
    const result = await createCommentInDB(formData);
    if ('createdComment' in result) {
      console.log('Created comment:', result.createdComment);
    }
    return { message: result.message };
  } catch (error) {
    return { message: 'Something went wrong' };
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await deleteCommentFromDB(commentId);
  } catch (error) {
    throw new Error('Failed to delete comment');
  }
};
