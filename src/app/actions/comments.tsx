'use server';
import { db } from '@/db';
import { z } from 'zod';

const createCommentSchema = z.object({
  content: z.string().min(10, "Comment should be longer than 10 letters"),
  userId: z.string().min(1, "User ID is required"),
  postId: z.string().min(1, "Post ID is required"),
  parentId: z.string().nullable(),
});

export const createComment = async (_prevState: { message: string }, formData: FormData) => {
  const content = formData.get('content');
  const userId = formData.get('userId');
  const postId = formData.get('postId');
  const parentId = formData.get('parentId');

  try {
    const parsedData = createCommentSchema.parse({ content, userId, postId, parentId });

    const createdComment = await db.comment.create({
      data: parsedData,
    });

    console.log('Created comment:', createdComment);

    return { message: 'Comment created successfully' };
  } catch (error: unknown) {
    console.error('Error creating comment:', error);
    if (error instanceof z.ZodError) {
      return { message: error.errors[0].message };
    } else if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: 'Something went wrong' };
    }
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    await db.comment.delete({
      where: { id: commentId },
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error('Failed to delete comment');
  }
};
