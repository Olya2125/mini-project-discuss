// "use client";

// import { useFormState } from "react-dom";
// import { useEffect, useRef, useState } from "react";
// import { Button, Avatar } from "@nextui-org/react";
// import { Textarea } from "@nextui-org/input";
// import * as actions from "@/actions";
// import { start } from "repl";
// import styles from "@/components/styles.module.css";

// interface CommentCreateFormProps {
//   postId: string;
//   parentId?: string;
//   startOpen: boolean;
// }

// export default function CommentCreateForm({
//   postId,
//   parentId,
//   startOpen,
// }: CommentCreateFormProps) {
//   const [open, setOpen] = useState(startOpen);
//   const ref = useRef<HTMLFormElement | null>(null);
//   const [formState, action] = useFormState(
//     actions.createComment.bind(null, { postId, parentId }),
//     { errors: {} }
//   );

//   useEffect(() => {
//     if (formState.success) {
//       ref.current?.reset();

//       if (!startOpen) {
//         setOpen(false);
//       }
//     }
//   }, [formState, startOpen]);

//   const form = (
//     <form action={action} ref={ref}>
//       <div className="flex flex-col items-center p-10">
//       <Textarea
//       name="content"
//       label="Reply"
//       labelPlacement="inside"
//           placeholder="Enter your description"
//           isDisabled={!!formState.errors.content}
//           errorMessage={formState.errors.content?.join(', ')}
//           className={styles.textarea}
//         />

// {formState.errors._form ? (
// <div>
// {formState.errors.content?.join(', ')}
// </div>
// ) : null}

//         <Button
//           color="primary"
//           variant="solid"
//           size="md"
//           radius="sm"
//           type="submit"
//         >
//           Save
//         </Button>
//       </div>
//     </form>
//   );

//   return (
//     <div>
// <button className={styles.reply} onClick={() => setOpen(!open)}>Reply</button>
// {open && form}
//     </div>
//   )
// }
