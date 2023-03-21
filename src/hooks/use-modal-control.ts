import { useCallback, useState } from 'react';

export const useModalControl = (initState: boolean) => {
  const [isOpen, setIsOpen] = useState(initState);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onOpenModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return { isOpen, onCloseModal, onOpenModal };
};
