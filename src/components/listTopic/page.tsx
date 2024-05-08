import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import "..//header/header.css";
import { db } from "@/db";



export default async function TopicList(props: any) {
  const topics = await db.topic.findMany(); 

  return (
    <div className="topics">
      <ul >
        <div >
          {topics.map(({slug, description, id}) => (
            <ul key={slug}>
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