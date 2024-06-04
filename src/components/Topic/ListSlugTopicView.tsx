'use client';
import React from 'react';
import { Topic } from '@prisma/client';

type TopicSlugListViewProps = {
  topic: Topic;
}

export default function TopicSlugListView({ topic }: TopicSlugListViewProps) {
  const { slug } = topic;

  return (
    <div>
      <div>{slug}</div>
    </div>
  );
}
