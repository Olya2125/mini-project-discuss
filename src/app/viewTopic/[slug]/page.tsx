import Header from "@/components/header/page";
import React from "react";
import { Button } from "@nextui-org/react";
import TopicList from "@/components/listTopic/page";
import PostList from "@/components/PostList/page";
import { db } from "@/db";
import { notFound } from "next/navigation";
import TopicListView from "@/components/listTopicView/page";

export default async function ViewTopic(props: any) {

  const { slug } = props.params;
  const topic = await db.topic.findFirst({
        where: {
            slug
        }
    });

    if (!topic) {
        return notFound();
    }

  return (
    <div>
      <Header />
      <div className="main_head">
      <div className="postmain alltitle">
        {/* <TopicListView topic={topic} /> */}
          <TopicListView topic={topic} displayOnlySlug />
          <PostList title="React" />
        </div>
        <div className="t">
          <Button className="button">Create Post</Button>
          <TopicListView topic={topic} />
        </div>
      </div>
    </div>
  );
}