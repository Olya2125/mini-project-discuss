import { db } from '@/db';
import { z } from 'zod';
import { handleError } from '@/utils/errorHandler';

const createCommentSchema = z.object({
  content: z.string().min(10, "Comment should be longer than 10 letters"),
  userId: z.string().min(1, "User ID is required"),
  postId: z.string().min(1, "Post ID is required"),
  parentId: z.string().nullable(),
});

type CreateCommentResult = 
  | { message: string }
  | { message: string; createdComment: { id: string; content: string; postId: string; userId: string; parentId: string | null; createdAt: Date; updatedAt: Date; } };

export const createCommentInDB = async (formData: FormData): Promise<CreateCommentResult> => {
  const content = formData.get('content');
  const userId = formData.get('userId');
  const postId = formData.get('postId');
  const parentId = formData.get('parentId');

  try {
    const parsedData = createCommentSchema.parse({ content, userId, postId, parentId });

    const createdComment = await db.comment.create({
      data: parsedData,
    });

    return { message: 'Comment created successfully', createdComment };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const deleteCommentFromDB = async (commentId: string) => {
  try {
    await db.comment.delete({
      where: { id: commentId },
    });
  } catch (error: unknown) {
    throw new Error('Failed to delete comment');
  }
};
