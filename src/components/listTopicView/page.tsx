"use client"

import React, { useState } from "react";
import "..//header/header.css";
import { Topic } from "@prisma/client";

type TopicListViewProps = {
  topic: Topic;
  displayOnlySlug?: boolean; // Добавляем опциональный параметр для определения отображения только slug
}

// export default function TopicListView({topic}: TopicListViewProps) {
  export default function TopicListView({
    topic,
    displayOnlySlug = false, // По умолчанию отображаем полный объект topic
  }: TopicListViewProps) {
  // const [slug] = useState<string>(topic.slug);
  // const [description] = useState<string>(topic.description);
  const { slug, description } = topic;

  return (
      <div className="topics">
        <h3>{slug}</h3>
        {!displayOnlySlug && <p>{description}</p>}
      </div>
  )
}