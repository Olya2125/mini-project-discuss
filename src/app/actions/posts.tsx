'use server';

import { createPostInDB, deletePostFromDB, getPopularPostsFromDB, updatePostInDB } from '@/db/posts';
import { handleError } from '@/utils/errorHandler';

export const createPost = async (_prevState: { message: string }, formData: FormData) => {
  try {
    const result = await createPostInDB(formData);
    if (result.errors) {
      return { message: result.message, errors: result.errors };
    }
    return { message: result.message };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await deletePostFromDB(postId);
    return { message: 'Post deleted successfully' };
  } catch (error) {
    return handleError(error);
  }
};

export const getPopularPosts = async () => {
  try {
    return await getPopularPostsFromDB();
  } catch (error) {
    throw new Error('Failed to fetch popular posts');
  }
};

export const updatePost = async (_prevState: { message: string }, formData: FormData) => {
  try {
    const result = await updatePostInDB(formData);
    if (result.errors) {
      return { message: result.message, errors: result.errors };
    }
    return { message: result.message };
  } catch (error) {
    return handleError(error);
  }
};