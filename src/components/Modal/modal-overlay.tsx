import {FC, useCallback, useEffect} from "react";
import modalStyle from "./modal.module.css";


type Props = {
    onClose: () => void
};

const ModalOverlay: FC<Props> = ({ onClose, }) => {
    const onKeyupEsc = useCallback((event: KeyboardEvent) => {
        if (event.key === `Escape`) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keyup', onKeyupEsc);
        return () => document.removeEventListener('keyup', onKeyupEsc);
    }, [onKeyupEsc]);

    return (<div className={modalStyle.overlay} onClick={onClose} />);
}

export default ModalOverlay;