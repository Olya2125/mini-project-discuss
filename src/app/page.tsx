// import { Button } from "@nextui-org/react";
// import * as action from "@/actions";

import { Button } from "@nextui-org/react";
import React from "react";
import Header from "@/components/header/page";
import TopicsSidebar from "@/components/listTopic/page";
import PostList from "@/components/PostList/page";
 import "..//components/header/header.css";


export default async function Home() {
  return (
    <div>
      <Header />
      <div className="main_head">
        <div className="toppost">
          <div className="postmain">
             <PostList title="Top Post" />
          </div>
        </div>
        <div className="t">
          <Button className="btn-signout"
                  color="primary"
                  size="md"
                  radius="sm"
                  variant="solid"
                  type="submit" >New Topic</Button>

          <TopicsSidebar title="Topics" />
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
}
