import { FC, useCallback, useEffect } from 'react';
import modalStyle from './modal-overlay.module.scss';

interface Props {
  onClose: () => void;
}

const ModalOverlay: FC<Props> = ({ onClose }) => {
  const onKeyupEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === `Escape`) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keyup', onKeyupEsc);
    return () => document.removeEventListener('keyup', onKeyupEsc);
  }, [onKeyupEsc]);

  return (
    <button
      type="button"
      aria-label="Закрыть модальное окно"
      className={modalStyle.overlay}
      onClick={onClose}
    />
  );
};

export default ModalOverlay;
