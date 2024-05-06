'use client';
import { ReactNode } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

type ModalWindowProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
  formHandler: () => void; // Функция для обработки отправки формы
};

export default function ModalWindow({ title, children, isOpen, onOpenChange, formHandler }: ModalWindowProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    formHandler(); // Вызываем функцию обработки формы
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button type='submit'>Submit</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
