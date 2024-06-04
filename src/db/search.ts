import { db } from '@/db';

export async function searchPosts(term: string) {
  return db.post.findMany({
    where: {
      OR: [
        { title: { contains: term } },
        { content: { contains: term } },
      ],
    },
    include: {
      user: true,
      comments: true,
      topic: true,
    },
  });
}