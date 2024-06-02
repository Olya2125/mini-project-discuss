'use server';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createTopicSchema = z.object({
  slug: z.string().min(1, "Name must be longer than 1 letters"),
  description: z.string().min(10, "Description should be longer than 10 letters"),
});

export const createTopic = async (_prevState: { message: string }, formData: FormData) => {
  const slug = formData.get('slug');
  const description = formData.get('description');

  try {
    const parsedData = createTopicSchema.parse({ slug, description });

    const existingTopic = await db.topic.findUnique({ where: { slug: parsedData.slug } });
    if (existingTopic) {
      return { message: 'Slug already exists. Please choose a different slug.' };
    }

    const createdTopic = await db.topic.create({
      data: parsedData,
    });

    console.log('Created topic:', createdTopic);

    return { message: 'Topic created successfully' };
  } catch (error: unknown) {
    console.error('Error creating topic:', error);
    if (error instanceof z.ZodError) {
      return { message: error.errors[0].message };
    } else if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: 'Something went wrong' };
    }
  }
};

export const getAllTopics = async () => {
  try {
    const topics = await db.topic.findMany();
    return topics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

export const deleteTopic = async (slug: string) => {
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
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw new Error('Failed to delete topic');
  }
};
