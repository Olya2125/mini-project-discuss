// import Header from "@/components/header/page";
// import React from "react";
// import { Button } from "@nextui-org/react";
// import TopicListView from "@/components/listTopicView/page";
// import PostList from "@/components/PostList/page";
// import { db } from "@/db";
// import { notFound } from "next/navigation";
// import styles from "@/components/styles.module.css";

// export default async function ViewTopic(props: any) {
//   const topic = await db.topic.findFirst({
//     });

//     if (!topic) {
//         return notFound();
//     }

//   return (
//     <div>
//       <Header />
//       <div className={styles.main_head}>
//       {/* <div className={styles.postmain}> */}
//         <div className={styles.alltitle}>
//           <TopicListView topic={topic} displayOnlySlug />
//           <PostList title="React" />
//           </div>
//         </div>
//         <div className={styles.t}>
//           <Button className={styles.button}>Create Post</Button>

//           <TopicListView topic={topic} />
//         </div>
//       {/* </div> */}
//     </div>
//   );
// }
