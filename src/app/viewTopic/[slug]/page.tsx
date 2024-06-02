import React from 'react';
import PostList from '@/components/Post/PostList/page';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import TopicListView from '@/components/Topic/listTopicView/page';
import styles from '@/components/styles.module.css';
import TopicSlugListView from '@/components/Topic/ListSlugTopicView/page';
import CreatePostComponent from '@/components/Post/CreatePostComponent';
import { SessionProvider } from 'next-auth/react';
import BackButton from '@/components/backButton/page';
import DeleteTopicButton from '@/components/Topic/DeleteTopicButton';

export default async function ViewTopic(props: any) {
  const { slug } = props.params;
  const topic = await db.topic.findFirst({
    where: {
      slug,
    },
    include: {
      posts: {
        include: {
          user: true,
          comments: true,
          topic: true,
        },
      },
    },
  });

  if (!topic) {
    return notFound();
  }

  const posts = await db.post.findMany({
    where: {
      topicId: topic.id,
    },
  });

  return (
    <SessionProvider>
      <div>
        <BackButton />
        <div className={styles.main_head}>
          <div className={styles.postmain}>
            <div className={styles.alltitle}>
              <TopicSlugListView topic={topic} />
              <PostList posts={topic.posts} />
            </div>
          </div>
          <div className={styles.t}>
            <CreatePostComponent topicId={topic.id} />
            <TopicListView topic={topic} />
            <DeleteTopicButton slug={slug} />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
