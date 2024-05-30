'use server';
import { db } from '@/db';

export const createComment = async (_prevState: { message: string }, formData: FormData) => {
    const content = formData.get('content') as string;
    const userId = formData.get('userId') as string;
    const postId = formData.get('postId') as string;
    const parentId = formData.get('parentId') as string | null;
  
    try {
      if (!content || content.length < 2) {
        return { message: 'Comment should be longer' };
      }
  
      const createdComment = await db.comment.create({
        data: {
          content,
          userId,
          postId,
          parentId,
        },
      });
  
      console.log('Created comment:', createdComment);
  
      return { message: 'Comment created successfully' };
    } catch (error: unknown) {
      console.error('Error creating comment:', error);
      if (error instanceof Error) {
        return { message: error.message };
      } else {
        return { message: 'Something went wrong' };
      }
    }
  };
  