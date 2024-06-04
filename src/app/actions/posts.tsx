'use server';
import { db } from '@/db';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(3, "Title should be longer than 3 letters "),
  content: z.string().min(10, "Content should be longer than 10 letters"),
  userId: z.string().min(1, "User ID is required"),
  topicId: z.string().min(1, "Topic ID is required"),
});

export const createPost = async (_prevState: { message: string }, formData: FormData) => {
  const title = formData.get('title');
  const content = formData.get('content');
  const userId = formData.get('userId');
  const topicId = formData.get('topicId');

  try {
    const parsedData = createPostSchema.parse({ title, content, userId, topicId });

    const createdPost = await db.post.create({
      data: parsedData,
    });

    console.log('Created post:', createdPost);

    return { message: 'Post created successfully' };
  } catch (error: unknown) {
    console.error('Error creating post:', error);
    if (error instanceof z.ZodError) {
      return { message: error.errors[0].message };
    } else if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: 'Something went wrong' };
    }
  }
};

export const deletePost = async (postId: string) => {
  try {
    await db.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};

import { getPopularPostsFromDB } from '@/db/posts';

export const getPopularPosts = async () => {
  try {
    return await getPopularPostsFromDB();
  } catch (error) {
    throw new Error('Failed to fetch popular posts');
  }
};
