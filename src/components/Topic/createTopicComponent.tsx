"use client";

import React, { useState, useEffect } from "react";
import { Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import ModalWindow from "@/components/modalWindow";
import { createTopic, updateTopic } from "@/app/actions/topics";
import { useSession } from "next-auth/react";
import OurInput from "@/components/ourInput";
import styles from "@/components/styles.module.css";

interface CreateTopicComponentProps {
  initialSlug?: string;
  initialDescription?: string;
  topicId?: string;
}

export default function CreateTopicComponent({ initialSlug = '', initialDescription = '', topicId }: CreateTopicComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slug, setSlug] = useState(initialSlug);
  const [description, setDescription] = useState(initialDescription);
  const [errors, setErrors] = useState<{ slug?: string; description?: string }>({});
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setSlug(initialSlug);
    setDescription(initialDescription);
  }, [initialSlug, initialDescription]);

  const openModal = () => {
    if (!session?.user) {
      setError('You must be logged in to edit topics');
    } else {
      setIsModalOpen(true);
      setError(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors({});
  };

  const closeNotification = () => {
    setNotification(null);
    window.location.reload();
  };

  const handleSaveTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const formData = new FormData();
      formData.append("slug", slug)
      formData.append("description", description);
      let result;

      if (topicId) {
        formData.append("topicId", topicId);
        result = await updateTopic({ message: "" }, formData);
      } else {
        result = await createTopic({ message: "" }, formData);
      }

      if (result.errors) {
        setErrors(result.errors);
      } else {
        setSlug('');
        setDescription('');
        closeModal();
        setNotification({ type: 'success', message: 'Topic saved successfully' });
      }
    } catch (error) {
      console.error("Error saving topic:", error);
      setNotification({ type: 'error', message: 'Error saving topic' });
    }
  };

  return (
    <div>
      <Button
        color="primary"
        variant="solid"
        size="lg"
        radius="sm"
        type="submit"
        onClick={openModal}
        className={topicId ? styles.btn_action : styles.btn_create}
      >
        {topicId ? 'Edit Topic' : 'New Topic'}
      </Button>
      {error && <p className={styles.error_message}>{error}</p>}
      <ModalWindow
        title={topicId ? 'Edit Topic' : 'Create a Topic'}
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        formHandler={handleSaveTopic}
      >
        <OurInput
          id="slug"
          label="Name"
          placeholder="Name"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          errorMessage={errors.slug}
          readOnly={!!topicId}
        />
        <Textarea
          id="description"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          errorMessage={errors.description}
          style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
        />
        {errors.description && <p className={styles.error_message} style={{ color: 'red', marginTop: '4px' }}>{errors.description}</p>}
      </ModalWindow>
      {notification && (
        <Modal isOpen={!!notification} onClose={closeNotification}>
          <ModalContent>
            <ModalHeader>{notification.type === 'success' ? 'Success' : 'Error'}</ModalHeader>
            <ModalBody>
              <p>{notification.message}</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={closeNotification}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}




// "use client";

// import React, { useState, useEffect } from "react";
// import { Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
// import ModalWindow from "@/components/modalWindow";
// import { createTopic, updateTopic } from "@/app/actions/topics";
// import { useSession } from "next-auth/react";
// import OurInput from "@/components/ourInput";
// import styles from "@/components/styles.module.css";

// interface CreateTopicComponentProps {
//   initialSlug?: string;
//   initialDescription?: string;
//   topicId?: string;
// }

// export default function CreateTopicComponent({ initialSlug = '', initialDescription = '', topicId }: CreateTopicComponentProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [slug, setSlug] = useState(initialSlug);
//   const [description, setDescription] = useState(initialDescription);
//   const [errors, setErrors] = useState<{ slug?: string; description?: string }>({});
//   const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const { data: session } = useSession();

//   useEffect(() => {
//     setSlug(initialSlug);
//     setDescription(initialDescription);
//   }, [initialSlug, initialDescription]);

//   const openModal = () => {
//     if (!session?.user) {
//       setError('You must be logged in to edit topics');
//     } else {
//       setIsModalOpen(true);
//       setError(null);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setErrors({});
//   };

//   const closeNotification = () => {
//     setNotification(null);
//     window.location.reload();
//   };

//   const handleSaveTopic = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors({});

//     try {
//       const formData = new FormData();
//       formData.append("slug", slug)
//       formData.append("description", description);
//       let result;

//       if (topicId) {
//         formData.append("topicId", topicId);
//         result = await updateTopic({ message: "" }, formData);
//       } else {
//         result = await createTopic({ message: "" }, formData);
//       }

//       if (result.errors) {
//         setErrors(result.errors);
//       } else {
//         setSlug('');
//         setDescription('');
//         closeModal();
//         setNotification({ type: 'success', message: 'Topic saved successfully' });
//       }
//     } catch (error) {
//       console.error("Error saving topic:", error);
//       setNotification({ type: 'error', message: 'Error saving topic' });
//     }
//   };

//   return (
//     <div>
//       <button

//         type="submit"
//         onClick={openModal}
//         className={topicId ? styles.btn_edit : styles.btn_create}
//       >
//         {topicId ? 'Edit Topic' : 'New Topic'}
//       </button>
//       {error && <p className={styles.error_message}>{error}</p>}
//       <ModalWindow
//         title={topicId ? 'Edit Topic' : 'Create a Topic'}
//         isOpen={isModalOpen}
//         onOpenChange={closeModal}
//         formHandler={handleSaveTopic}
//       >
//         <OurInput
//           id="slug"
//           label="Name"
//           placeholder="Name"
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//           errorMessage={errors.slug}
//           readOnly={!!topicId}
//         />
//         <Textarea
//           id="description"
//           label="Description"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           errorMessage={errors.description}
//           style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
//         />
//         {errors.description && <p className={styles.error_message} style={{ color: 'red', marginTop: '4px' }}>{errors.description}</p>}
//       </ModalWindow>
//       {notification && (
//         <Modal isOpen={!!notification} onClose={closeNotification}>
//           <ModalContent>
//             <ModalHeader>{notification.type === 'success' ? 'Success' : 'Error'}</ModalHeader>
//             <ModalBody>
//               <p>{notification.message}</p>
//             </ModalBody>
//             <ModalFooter>
//               <Button onClick={closeNotification}>Close</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       )}
//     </div>
//   );
// }
