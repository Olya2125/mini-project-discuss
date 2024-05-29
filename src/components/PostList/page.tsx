// import React from "react";
// import { Link } from "@nextui-org/react";
// import PostCard from "../PostCard/page";
// import styles from "@/components/styles.module.css";



// function PostList({ title }: { title: string }) {

//   return (
//     <div className={styles.postmain}>
//       <h1 >{title}</h1>
//       <div>
//       <PostCard title=""/>
//       </div>
//     </div>
//   );
// }

// export default PostList;

import React from 'react';
import styles from '@/components/styles.module.css';

const PostList: React.FC<{ posts: any[] }> = ({ posts }) => {
  return (
    <div className={styles.posts}>
      <h2 className={styles.posts_title}>Посты</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={styles.post_item}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
