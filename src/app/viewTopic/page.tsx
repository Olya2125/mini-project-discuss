import Header from "@/components/header/page";
import React from "react";
import { Button } from "@nextui-org/react";
import TopicListView from "@/components/listTopicView/page";
import TopicList from "@/components/listTopic/page";
import PostList from "@/components/PostList/page";
import { db } from "@/db";
import { notFound } from "next/navigation";

export default async function ViewTopic(props: any) {
  const { slug } = props.params;
  const topic = await db.topic.findFirst({
    });

    if (!topic) {
        return notFound();
    }

  return (
    <div>
      <Header />
      <div className="main_head">
      {/* <div className="postmain alltitle">
          <TopicList topic={slug} />
          <PostList title="React" />
        </div> */}
        <div>
          {/* <Button className="button">Create Post</Button> */}

          <TopicListView topic={topic} />
        </div>
      </div>
    </div>
  );
}
