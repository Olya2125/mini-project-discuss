// import * as action from "@/actions";
// import { Button } from '@nextui-org/react';

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
            <PostCard title='JavaScript' />
            </div>
            </div>

        </div>
        <div className={styles.t}>
          <CreateTopicComponent />
          <TopicList  title="Topics" />

        </div>

      </div>

    {/* <main className="flex  flex-col items-center justify-between p-5">

      <form action={action.signIn}>
        <Button type="submit">Sign in</Button>
      </form>
      <form action={action.signOut}>
        <Button type="submit">Sign out</Button>
      </form>

      {session?.user ? (
        <div>
          <h3>Signed in</h3>
          <p>{JSON.stringify(session.user)}</p>
        </div>
      ) : (
        <div>signed out</div>
      )}
    </main> */}
    </div>
  );
};