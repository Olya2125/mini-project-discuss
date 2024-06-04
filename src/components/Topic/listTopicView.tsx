"use client"
import React, { useState } from "react";
import { Topic } from "@prisma/client";
import styles from "@/components/styles.module.css";

type TopicListViewProps = {
  topic: Topic;
}

export default function TopicListView({ topic}: TopicListViewProps) {
    
  const { slug, description } = topic;

  return (
    <div className={styles.topics}>
      <h1 className={styles.post_title}>{slug}</h1>
      <p className={styles.description_title}>{description}</p>
    </div>
  )
}