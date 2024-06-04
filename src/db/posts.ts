import { db } from '@/db';
import { z } from 'zod';
import { handleError } from '@/utils/errorHandler';

const createPostSchema = z.object({
  title: z.string().min(3, "Title should be longer than 3 letters"),
  content: z.string().min(10, "Content should be longer than 10 letters"),
  userId: z.string().min(1, "User ID is required"),
  topicId: z.string().min(1, "Topic ID is required"),
});

export const createPostInDB = async (formData: FormData) => {
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
