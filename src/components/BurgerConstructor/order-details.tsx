import { FC } from "react";
import doneImage from '../../images/done.svg'
import burgerConstructorStyle from "./burger-constructor.module.css";

const OrderDetails: FC
    = (props) => {
    return (<>
            <div className={burgerConstructorStyle['order-details']}>
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
            </div>
        </>
    );
}

export default OrderDetails;