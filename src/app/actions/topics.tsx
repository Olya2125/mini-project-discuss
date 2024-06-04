'use server';
import { createTopicInDB, getAllTopicsFromDB, deleteTopicFromDB } from '@/db/topics';
import { z } from 'zod';

export const createTopic = async (_prevState: { message: string }, formData: FormData) => {
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;

  try {
    const result = await createTopicInDB(slug, description);
    return { message: result.message };
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
  return await getAllTopicsFromDB();
};

export const deleteTopic = async (slug: string) => {
  return await deleteTopicFromDB(slug);
};
