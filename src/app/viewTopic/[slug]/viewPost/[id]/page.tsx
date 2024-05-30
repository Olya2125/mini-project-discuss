import React from 'react';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import { Textarea } from '@nextui-org/input';
import { Button, Avatar } from '@nextui-org/react';
import styles from '@/components/styles.module.css';
import BackButton from '@/components/backButton/page';

export default async function ViewPost(props: any) {
  const { id, slug } = props.params;
  const post = await db.post.findUnique({
    where: { id },
    include: {
      user: true,
      topic: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <BackButton/>
      <div className="flex flex-col items-center p-10">
        <h3 className={styles.alltitle}>{post.title}</h3>
        <p className={styles.application}>{post.content}</p>
        <Textarea
          placeholder="Enter your comment"
          className={styles.textarea}
        />
        <Button
          color="primary"
          variant="solid"
          size="md"
          radius="sm"
          type="submit"
        >
          Save
        </Button>
      </div>
      <div>
        <p className={styles.application_comments}>
          All {post.comments.length} comments
        </p>
        {post.comments.map((comment) => (
          <div key={comment.id} className={styles.border}>
            <div className={styles.comment_one}>
              <Avatar />
              <div className={styles.comment_one_info}>
                <h3>{comment.user.name}</h3>
                <p>{comment.content}</p>
                <button className={styles.reply}>Reply</button>
              </div>
            </div>
            {/* {comment.children &&
              comment.children.map((child) => (
                <div key={child.id} className={styles.border_second}>
                  <div className={styles.comment_one}>
                    <Avatar />
                    <div className={styles.comment_one_info}>
                      <h3>{child.user.name}</h3>
                      <p>{child.content}</p>
                      <button className={styles.reply}>Reply</button>
                    </div>
                  </div>
                </div>
              ))} */}
          </div>
        ))}
      </div>
    </div>
  );
}
