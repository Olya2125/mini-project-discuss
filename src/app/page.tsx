// import { Button } from "@nextui-org/react";
// import * as action from "@/actions";

import PostCard from "@/components/PostCard/page";
import { Button, Navbar } from "@nextui-org/react";
import React from "react";

import PostList from "@/components/listTopic/page";
import Header from "@/components/header/page";

export default async function Home() {
  return (
    <div>
      <Header />
      <div className="main_head">
        <div className="toppost">
          <div className="postmain">
            <PostCard title="Top Post" />
          </div>
        </div>
        <div className="t">
          <Button className="button">New Topic</Button>

          <PostList title="Topics" />
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
