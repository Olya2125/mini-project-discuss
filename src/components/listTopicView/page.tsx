"use client"
import React, { useState } from "react";
import { Topic } from "@prisma/client";
import styles from "@/components/styles.module.css";

type TopicListViewProps = {
  topic: Topic;
  displayOnlySlug?: boolean; // Добавляем опциональный параметр для определения отображения только slug
}

export default function TopicListView({
  topic,
  displayOnlySlug = false, // По умолчанию отображаем полный объект topic
}: TopicListViewProps) {
    
  const { slug, description } = topic;

  return (
    <div className={styles.topics}>
      <h3>{slug}</h3>
      {!displayOnlySlug && <p>{description}</p>}
    </div>
  )
}