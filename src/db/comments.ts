import { db } from '@/db';
import { z } from 'zod';
import { handleError } from '@/utils/errorHandler';

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  };
  children?: Comment[];
}

const createCommentSchema = z.object({
  content: z.string().min(10, "Comment should be longer than 10 letters"),
  userId: z.string().min(1, "User ID is required"),
  postId: z.string().min(1, "Post ID is required"),
  parentId: z.string().nullable(),
});

export const createCommentInDB = async (formData: FormData) => {
  const content = formData.get('content') as string;
  const userId = formData.get('userId') as string;
  const postId = formData.get('postId') as string;
  const parentId = formData.get('parentId') as string | null;

  try {
    const parsedData = createCommentSchema.parse({ content, userId, postId, parentId });

    const createdComment = await db.comment.create({
      data: parsedData,
    });

    return { message: 'Comment created successfully', createdComment };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: 'Validation failed',
        errors: error.errors.reduce((acc, curr) => {
          if (curr.path.length > 0) {
            const key = curr.path[0] as string;
            acc[key] = curr.message;
          }
          return acc;
        }, {} as Record<string, string>),
      };
    }
    return handleError(error);
  }
};

export const deleteCommentFromDB = async (commentId: string) => {
  try {
    await db.comment.delete({
      where: { id: commentId },
    });
  } catch (error) {
    throw new Error('Failed to delete comment');
  }
};

export const getNestedCommentsFromDB = async (postId: string): Promise<Comment[]> => {
  const fetchNestedComments = async (parentId: string | null): Promise<Comment[]> => {
    const comments = await db.comment.findMany({
      where: { postId, parentId },
      include: {
        user: true,
        children: true,
      },
    });

    for (const comment of comments) {
      comment.children = await fetchNestedComments(comment.id);
    }

    return comments;
  };

  return fetchNestedComments(null);
};
