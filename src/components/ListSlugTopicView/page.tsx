'use client';
import React, { useState } from 'react';
import { Topic } from '@prisma/client';
import styles from '@/components/styles.module.css';

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
