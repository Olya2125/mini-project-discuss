'use client';

import React from 'react';
import styles from '@/components/styles.module.css';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

interface ConfirmModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  title,
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" className={styles.modal}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody >
          <p>Are you sure you want to delete?</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} className={styles.btn_chanel}>Cancel</Button>
          <Button  className={styles.btndelete} onClick={onConfirm}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
