import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import { db } from "@/db";
import styles from "@/components/styles.module.css";

export default async function TopicList(props: any) {
  const topics = await db.topic.findMany(); 

  return (
    <div className={styles.topics}>
      <ul >
        <div >
          {topics.map(({slug, description, id}) => (
            <ul key={slug}>
              {/* <Link href={`/viewTopic/${encodeURIComponent(slug)}`} > */}
              <Link href={`/viewTopic/${slug}`} >
              <h3>{slug}</h3>
              </Link>
            </ul>
          ))}
        </div>
      </ul>
    </div>
  )
}
