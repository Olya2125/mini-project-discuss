'use server';

import { createPostInDB, deletePostFromDB, getPopularPostsFromDB } from '@/db/posts';
import { handleError } from '@/utils/errorHandler';

export const createPost = async (_prevState: { message: string }, formData: FormData) => {
  try {
    const result = await createPostInDB(formData);
    if ('createdPost' in result) {
      console.log('Created post:', result.createdPost);
    }
    return { message: result.message };
  } catch (error) {
    return handleError(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await deletePostFromDB(postId);
  } catch (error) {
    return handleError(error);
  }
};

export const getPopularPosts = async () => {
  try {
    return await getPopularPostsFromDB();
  } catch (error) {
    return handleError(error);
  }
};
