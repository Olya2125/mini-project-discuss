'use server';

import React from 'react';
import CreateTopicComponent from '@/components/Topic/createTopicComponent';
import TopicList from '@/components/Topic/listTopic/page';
import styles from '@/components/styles.module.css';
import PopularPosts from '@/components/Post/PopularPosts';

export default async function Home() {
  return (
    <div>
      <div className={styles.main_head}>
        <PopularPosts />
        <div className={styles.t}>
          <CreateTopicComponent />
          <TopicList title="Topics" />
        </div>
      </div>
    </div>
  );
}
