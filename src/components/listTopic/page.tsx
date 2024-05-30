import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import { db } from "@/db";
import styles from '@/components/styles.module.css'

export default async function TopicList(props: any) {
  const topics = await db.topic.findMany(); 

  return (
    <div>
    <div className={styles.topics}>
      <ul >
        <div >
          <h2 className={styles.topics_small}>Topics</h2>
          {topics.map(({slug, description, id}) => (
            <ul className={styles.topic_ul} key={slug}>
              {/* <Link href={`/viewTopic/${encodeURIComponent(slug)}`} > */}
              <Link href={`/viewTopic/${slug}`} >
              <h3 className={styles.link}>{slug}</h3>
              </Link>
            </ul>
          ))}
        </div>
      </ul>
    </div>
    </div>
  )
}
