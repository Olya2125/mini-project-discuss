'use server';

import { createPostInDB, deletePostFromDB, getPopularPostsFromDB } from '@/db/posts';

export const createPost = async (_prevState: { message: string }, formData: FormData) => {
  try {
    const result = await createPostInDB(formData);
    console.log('Created post:', result.createdPost);
    return { message: result.message };
  } catch (error) {
    return { message: 'Something went wrong' };
  }
};

export const deletePost = async (postId: string) => {
  try {
    await deletePostFromDB(postId);
  } catch (error) {
    throw new Error('Failed to delete post');
  }
};

export const getPopularPosts = async () => {
  try {
    const popularPosts = await getPopularPostsFromDB();
    return popularPosts;
  } catch (error) {
    return [];
  }
};
