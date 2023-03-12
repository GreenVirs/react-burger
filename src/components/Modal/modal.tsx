import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { getRootModal } from "../../utils/getRootModal";
import PropTypes from "prop-types";
import modalStyle from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const { rootModal } = getRootModal();

const propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
}

type Props = PropsWithChildren<{
    isOpen: boolean
    onClose: () => void
    title?: string
}>;

const Modal: FC<Props> = (props) => {
    return props.isOpen ? createPortal((<div className={`pt-10 pr-10 pl-10 pb-15 ${modalStyle.modal}`}>
            <header className={modalStyle['modal__header']}>
                { typeof props.title !== 'undefined' && <span className={'text text_type_main-large'}>{ props.title }</span>}
                <button className={modalStyle['modal__close-btn']} onClick={props.onClose}>
                    <CloseIcon type={'primary'} />
                </button>
            </header>
            <div className={modalStyle['modal__content']}>
                {props.children}
            </div>
    </div>), rootModal as HTMLDivElement) : (<></>);
}

//@ts-ignore
Modal.propTypes = propTypes;

export default Modal;