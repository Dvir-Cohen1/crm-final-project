import { useState } from 'react';

const useModal = () => {
     const [isOpen, setIsOpen] = useState(false);
     
     const openModal = () => {
          setIsOpen(true);
     };

     const closeModal = () => {
          setIsOpen(false);
     };

     const handleCancel = () => {
          setIsOpen(false);
     };

     return {
          isOpen,
          openModal,
          closeModal,
          handleCancel
     };
};

export default useModal;
