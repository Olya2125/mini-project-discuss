'use server';
import { db } from '@/db';

export const createPost = async (_prevState: { message: string }, formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const userId = formData.get('userId') as string;
    const topicId = formData.get('topicId') as string;

    console.log('createPost called with:', { title, content, userId, topicId }); 

    try {
      if (!title || title.length < 3) {
        return { message: 'Title should be longer' };
      }

      if (!content || content.length < 10) {
        return { message: 'Content should be longer' };
      }

      const createdPost = await db.post.create({
        data: {
          title,
          content,
          userId,
          topicId,
        },
      });

      console.log('Created post:', createdPost); 

      return { message: 'Post created successfully' };

    } catch (error: unknown) {
      console.error('Error creating post:', error); 
      if (error instanceof Error) {
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