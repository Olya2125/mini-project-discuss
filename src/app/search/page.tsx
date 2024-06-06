import React from 'react';
import { notFound } from 'next/navigation';
import PostCard from '@/components/Post/PostCard';
import styles from '@/components/styles.module.css';
import { searchPosts } from '@/db/search';
import CreateTopicComponent from '@/components/Topic/createTopicComponent';
import TopicList from '@/components/Topic/listTopic';
import { SessionProvider } from 'next-auth/react';

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (!term) {
    return notFound();
  }

  const posts = await searchPosts(term);

  return (
    <SessionProvider>
    <div className={styles.main_head}>
    <div className={styles.search_results}>
      <h1 className={styles.search_result}>Search Results for "{term}"</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            slug={post.topic.slug}
            title={post.title}
            author={post.user.name || 'Unknown'}
            comments={`${post.comments.length} comments`}
            showDeleteButton={false}
          />
        ))
      ) : (
        <p className={styles.search_result_no}>No posts found for the search term "{term}"</p>
      )}
    </div>
              <div className={styles.t}>
              <CreateTopicComponent />
              <TopicList title="Topics" />
            </div>
            </div>
            </SessionProvider>
  );
}