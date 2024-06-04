'use server';

import { createTopicInDB, getAllTopicsFromDB, deleteTopicFromDB } from '@/db/topics';
import { handleError } from '@/utils/errorHandler';

export const createTopic = async (_prevState: { message: string }, formData: FormData) => {
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;

  try {
    const result = await createTopicInDB(slug, description);
    return { message: result.message };
  } catch (error) {
    return handleError(error);
  }
};

export const getAllTopics = async () => {
  return await getAllTopicsFromDB();
};

export const deleteTopic = async (slug: string) => {
  try {
    await deleteTopicFromDB(slug);
    return { message: 'Topic deleted successfully' };
  } catch (error) {
    return handleError(error);
  }
};
