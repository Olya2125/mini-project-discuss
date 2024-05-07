"use client"
import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import { Topic } from "@prisma/client";
import { getAllTopics } from "@/app/actions"; // Импорт функции получения всех тем
import styles from "@/components/styles.module.css";


type PostListProps = {
  title: string;
};

const PostList: React.FC<PostListProps> = ({ title }) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsFromDB = await getAllTopics(); // Получаем все темы из базы данных
        setTopics(topicsFromDB); // Устанавливаем полученные темы в состояние
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []); // Пустой массив зависимостей означает, что эффект будет вызван только при монтировании компонента

  return (
    <div className={styles.topics}>
      <h3 className={styles.topic}>{title}</h3>
      <ul >
        <div >
          {topics.map((topic) => (
            <li  key={topic.id} className={styles.postlist}>
              <Link href={`/topics/${topic.slug}`} className={styles.topic_link}>
                {topic.slug}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default PostList;
