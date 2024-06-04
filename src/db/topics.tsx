import { db } from '@/db';
import { z } from 'zod';
import { handleError } from '@/utils/errorHandler';

const createTopicSchema = z.object({
  slug: z.string().min(1, "Name must be longer than 1 letter"),
  description: z.string().min(10, "Description should be longer than 10 letters"),
});

export const createTopicInDB = async (slug: string, description: string) => {
  try {
    const parsedData = createTopicSchema.parse({ slug, description });

    const existingTopic = await db.topic.findUnique({ where: { slug: parsedData.slug } });
    if (existingTopic) {
      return { message: 'Slug already exists. Please choose a different slug.' };
    }

    const createdTopic = await db.topic.create({
      data: parsedData,
    });

    return { message: 'Topic created successfully', createdTopic };
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const getAllTopicsFromDB = async () => {
  try {
    const topics = await db.topic.findMany();
    return topics;
  } catch (error: unknown) {
    return handleError(error);
  }
};

export const deleteTopicFromDB = async (slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);

    await db.$transaction(async (prisma) => {
      const topic = await prisma.topic.findUnique({
        where: { slug: decodedSlug },
        include: {
          posts: {
            include: {
              comments: true,
            },
          },
        },
      });

      if (!topic) {
        throw new Error('Topic not found');
      }

      for (const post of topic.posts) {
        await prisma.comment.deleteMany({
          where: { postId: post.id },
        });
      }

      await prisma.post.deleteMany({
        where: { topicId: topic.id },
      });

      await prisma.topic.delete({
        where: { id: topic.id },
      });
    });
  } catch (error: unknown) {
    return handleError(error);
  }
};
