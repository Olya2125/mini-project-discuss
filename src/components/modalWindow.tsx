"use client";
import { ReactNode } from "react";
import styles from "@/components/styles.module.css";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type ModalWindowProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
  formHandler: () => void;
};

export default function ModalWindow({
  title,
  children,
  isOpen,
  onOpenChange,
  formHandler,
}: ModalWindowProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit called");
    formHandler();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      className={styles.create_modal}
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader >{title}</ModalHeader>
          <ModalBody >{children}</ModalBody>
          <ModalFooter>
            <Button
                    type="submit"
className={styles.btn_chanel}
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
