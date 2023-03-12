import ModalOverlay from "../Modal/modal-overlay";
import Modal from "../Modal/modal";
import { FC } from "react";
import PropTypes from "prop-types";
import doneImage from '../../images/done.svg'
import burgerConstructorStyle from "./burger-constructor.module.css";

const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

type Props = {
    isOpen: boolean
    onClose: () => void,
}
const OrderDetails: FC<Props> = (props) => {
    return (<>
            <ModalOverlay isOpen={props.isOpen} onClose={props.onClose} />
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <div className={`text text_type_digits-large  ${burgerConstructorStyle['order-details__text']}`}>034536</div>
                <div className={`mt-8 text text_type_main-medium  ${burgerConstructorStyle['order-details__text']}`}>идентификатор заказа</div>
                <div className={`mt-15 ${burgerConstructorStyle['order-details__image']}`}>
                    <img src={doneImage} alt={'done'} />
                </div>
                <div className={`mt-15 text text_type_main-default ${burgerConstructorStyle['order-details__text']}`}>
                    Ваш заказ начали готовить
                </div>
                <div className={`mt-2 mb-15 text text_color_inactive text_type_main-default  ${burgerConstructorStyle['order-details__text']}`}>
                    Дождитесь готовности на орбитальной станции
                </div>
            </Modal>
        </>
    );
}

OrderDetails.propTypes = propTypes;

export default OrderDetails;