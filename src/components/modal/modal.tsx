import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getRootModal } from '../../utils/get-root-modal';
import modalStyle from './modal.module.scss';
import ModalOverlay from './modal-overlay/modal-overlay';

const { rootModal } = getRootModal();

type Props = PropsWithChildren<{
  onClose: () => void;
  title?: string;
}>;

const Modal: FC<Props> = (props) =>
  createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={`pt-10 pr-10 pl-10 pb-15 ${modalStyle.modal}`}>
        <header className={modalStyle.modal__header}>
          {typeof props.title !== 'undefined' && (
            <span className="text text_type_main-large">{props.title}</span>
          )}
          <button
            type="button"
            className={modalStyle['modal__close-btn']}
            onClick={props.onClose}
            data-cy-close-modal=""
          >
            <CloseIcon type="primary" />
          </button>
        </header>
        <div className={modalStyle.modal__content}>{props.children}</div>
      </div>
    </>,
    rootModal as HTMLDivElement
  );

export default Modal;
