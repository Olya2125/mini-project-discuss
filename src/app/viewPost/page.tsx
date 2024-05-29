import React from "react";
import { Textarea } from "@nextui-org/input";
import { Button, Avatar } from "@nextui-org/react";
import styles from "@/components/styles.module.css";

export default function ViewPost() {
  return (
    <div>
      <div className="flex flex-col items-center p-10">
        <h3 className={styles.alltitle}>Implementing Charts</h3>
        <p className={styles.application}>
          I'm trying to add a chart into my application, can anyone help me out?
        </p>

        <Textarea
          placeholder="Enter your description"
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
        <p className={styles.application_comments}>All 20 comments</p>
        <div className={styles.border}>
          <div className={styles.comment_one}>
            <Avatar></Avatar>
            <div className={styles.comment_one_info}>
              <h3>Mike</h3>
              <p>Hello! I have problem. Maybe someone can help me?</p>
              <button className={styles.reply}>Reply</button>
            </div>
          </div>
          <div className={styles.border_second}>
            <div className={styles.comment_one}>
              <Avatar></Avatar>
              <div className={styles.comment_one_info}>
                <h3>Nick</h3>
                <p>Hello Mike! What's the problem?</p>
                <button className={styles.reply}>Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
