import { db } from '@/db';
import { z } from 'zod';
import { handleError } from '@/utils/errorHandler';

const createPostSchema = z.object({
  title: z.string().min(3, "Title should be longer than 3 letters"),
  content: z.string().min(10, "Content should be longer than 10 letters"),
  userId: z.string().min(1, "User ID is required"),
  topicId: z.string().min(1, "Topic ID is required"),
});

export const createPostInDB = async (formData: FormData): Promise<
  | { message: string; createdPost?: undefined; errors?: Record<string, string> }
  | { message: string; createdPost: { id: string; title: string; content: string; userId: string; topicId: string; createdAt: Date; updatedAt: Date }; errors?: undefined }
> => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const userId = formData.get('userId') as string;
  const topicId = formData.get('topicId') as string;

  try {
    const parsedData = createPostSchema.parse({ title, content, userId, topicId });

    const createdPost = await db.post.create({
      data: parsedData,
    });

    return { message: 'Post created successfully', createdPost };
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

export const deletePostFromDB = async (postId: string) => {
  try {
    await db.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    return handleError(error);
  }
};

export const getPopularPostsFromDB = async () => {
  try {
    return await db.post.findMany({
      orderBy: {
        comments: {
          _count: 'desc',
        },
      },
      take: 5,
      include: {
        user: true,
        comments: true,
        topic: true,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

const updatePostSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  title: z.string().min(3, "Title should be longer than 3 letters"),
  content: z.string().min(10, "Content should be longer than 10 letters"),
});

export const updatePostInDB = async (formData: FormData): Promise<
  | { message: string; updatedPost?: undefined; errors?: Record<string, string> }
  | { message: string; updatedPost: { id: string; title: string; content: string; userId: string; topicId: string; createdAt: Date; updatedAt: Date }; errors?: undefined }
> => {
  const postId = formData.get('postId') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  try {
    const parsedData = updatePostSchema.parse({ postId, title, content });

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: { title: parsedData.title, content: parsedData.content },
    });

    return { message: 'Post updated successfully', updatedPost };
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