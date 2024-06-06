import React from 'react';
import PostList from '@/components/Post/PostList';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import TopicListView from '@/components/Topic/listTopicView';
import styles from '@/components/styles.module.css';
import TopicSlugListView from '@/components/Topic/ListSlugTopicView';
import CreatePostComponent from '@/components/Post/CreatePostComponent';
import CreateTopicComponent from '@/components/Topic/createTopicComponent';
import { SessionProvider } from 'next-auth/react';
import BackButton from '@/components/backButton/page';
import DeleteTopicButton from '@/components/Topic/DeleteTopicButton';
import CommentTree from '@/components/comment/CommentTree';

export default async function ViewTopic(props: any) {
  const { slug } = props.params;
  const decodedSlug = decodeURIComponent(slug);
  const topic = await db.topic.findFirst({
    where: {
      slug: decodedSlug,
    },
    include: {
      posts: {
        include: {
          user: true,
          comments: {
            where: { parentId: null },
            include: {
              user: true,
              children: {
                include: {
                  user: true,
                  children: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          },
          topic: true,
        },
      },
    },
  });

  if (!topic) {
    return notFound();
  }

  return (
    <SessionProvider>
      <div className={styles.border_all}>
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
            <div className={styles.button_group_vertical}>
              <CreateTopicComponent topicId={topic.id} initialSlug={topic.slug} initialDescription={topic.description} />
              <DeleteTopicButton slug={slug} />
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
