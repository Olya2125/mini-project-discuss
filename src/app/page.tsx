import React from 'react';
import PostCard from '@/components/Post/PostCard/page';
import CreateTopicComponent from '@/components/Topic/createTopicComponent';
import TopicList from '@/components/Topic/listTopic/page';
import styles from "@/components/styles.module.css";


export default function Home() {

  return (
    <div> 
      <div className={styles.main_head}>
        <div className={styles.toppost}>
          <div className={styles.postmain} >
            <div className={styles.alltitle}>
              <h3>Top post</h3>
            <PostCard title='JavaScript' id={''} slug={''} author={''} comments={''} />
            </div>
            </div>

        </div>
        <div className={styles.t}>
          <CreateTopicComponent />
          <TopicList  title="Topics" />

        </div>

      </div>
    </div>
  );
};