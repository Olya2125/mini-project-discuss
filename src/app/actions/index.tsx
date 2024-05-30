'use server';
import { db } from '@/db';
import { redirect } from 'next/navigation';

export const createTopic = async (_prevState: { message: string }, formData: FormData) => {
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;

  try {
    if (!slug || slug.length < 3) {
      return { message: 'Name should be longer' };
    }

    if (!description || description.length < 2) {
      return { message: 'Description should be longer' };
    }

    const existingTopic = await db.topic.findUnique({ where: { slug } });
    if (existingTopic) {
      return { message: 'Slug already exists. Please choose a different slug.' };
    }

    if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
      return { message: 'Temporary condition. Slug should only contain letters, numbers, and hyphens (-).' };
    }

    const createdTopic = await db.topic.create({
      data: {
        slug,
        description,
      },
    });

    console.log('Created topic:', createdTopic); 

    return { message: 'Topic created successfully' };
    
  } catch (error: unknown) {
    console.error('Error creating topic:', error); 
    if (error instanceof Error) {
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
  await db.topic.delete({
      where: {
          slug
      }
  })
  
  redirect(`/`);
}

export const createPost = async (_prevState: { message: string }, formData: FormData) => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const userId = formData.get('userId') as string;
  const topicId = formData.get('topicId') as string;

  console.log('createPost called with:', { title, content, userId, topicId }); 

  try {
    // Проверка длины заголовка
    if (!title || title.length < 3) {
      return { message: 'Заголовок должен быть длиннее' };
    }

    // Проверка длины содержания
    if (!content || content.length < 10) {
      return { message: 'Содержание должно быть длиннее' };
    }

    // Создание поста в базе данных
    const createdPost = await db.post.create({
      data: {
        title,
        content,
        userId,
        topicId,
      },
    });

    console.log('Созданный пост:', createdPost); 

    return { message: 'Пост успешно создан' };

  } catch (error: unknown) {
    console.error('Ошибка при создании поста:', error); 
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: 'Что-то пошло не так' };
    }
  }
};