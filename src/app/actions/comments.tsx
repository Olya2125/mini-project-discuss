'use server';

import { createCommentInDB, deleteCommentFromDB, getNestedCommentsFromDB, Comment } from '@/db/comments';
import { handleError } from '@/utils/errorHandler';

export const createComment = async (_prevState: { message: string }, formData: FormData) => {
  try {
    const result = await createCommentInDB(formData);
    if ('errors' in result) {
      return { message: result.message, errors: result.errors };
    }
    return { message: result.message };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await deleteCommentFromDB(commentId);
  } catch (error) {
    throw new Error('Failed to delete comment');
  }
};

export const getNestedComments = async (postId: string): Promise<Comment[]> => {
  try {
    const comments = await getNestedCommentsFromDB(postId);
    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};
