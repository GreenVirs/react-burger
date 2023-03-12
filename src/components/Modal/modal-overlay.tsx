import {FC, useCallback, useEffect} from "react";
import { createPortal } from "react-dom";
import { getRootModal } from "../../utils/getRootModal";
import modalStyle from "./modal.module.css";
import PropTypes from "prop-types";

const { rootModal } = getRootModal();

const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

type Props = {
    isOpen: boolean
    onClose: () => void
};

const ModalOverlay: FC<Props> = ({ onClose, isOpen }) => {
    const listener = useCallback((event: KeyboardEvent) => {
        if (event.key === `Escape`) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keyup', listener, { once: true });
        }
        return () => document.removeEventListener('keyup', listener);
    }, [isOpen, listener]);

    return isOpen ? createPortal((<div className={modalStyle.overlay} onClick={onClose} />), rootModal as HTMLDivElement) : (<></>);
}

ModalOverlay.propTypes = propTypes;

export default ModalOverlay;