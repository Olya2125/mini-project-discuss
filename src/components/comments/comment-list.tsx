// import type {CommentWithAuthor} from '@/db/queries/comments';
// import CommentShow from '@/components/comments/comment-show';
// import {fetchCommentsByPostId} from '@/db/queries/comments';

// interface CommentListprops {
//     postId: string;
// }

// export default async function CommentList ({ postId} : CommentList) {
//     const comments = await fetchCommentsByPostId(postId);

//     const topLevelComments = comments.filter(
//         (comment) => comment.parentId === null
//     );

//     const renderredComments = topLevelComments.map((comment) => {
//         return(
//             <CommentShow key={comment.id} commentId={comment.id} postId={postId.id}/>
//         );
//     });
// return (
//     <div className='space-y-3'>
//         <h1 className='text-lg font-bold'> All {comments.lenght} comments</h1>
//     {renderredComments}
//     </div>
// );


// }