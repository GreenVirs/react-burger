import { FC } from 'react';
import { clsx } from 'clsx';
import doneImage from '../../../images/done.svg';
import burgerConstructorStyle from './order-details.module.scss';
import { selectOrder } from '../../../services/reducers/order';
import { useRootSelector } from '../../../hooks/use-root-selector';

const textDefaultClasses = clsx('text text_type_main-default');

const orderNumberClasses = clsx(
  burgerConstructorStyle['order-details__text'],
  burgerConstructorStyle['order-details__number']
);
const orderIdentifierClasses = clsx(
  burgerConstructorStyle['order-details__text'],
  burgerConstructorStyle['order-details__identifier']
);

const orderStartTextClasses = clsx(
  'mt-15',
  textDefaultClasses,
  burgerConstructorStyle['order-details__text']
);

const inactiveTextClasses = clsx(
  textDefaultClasses,
  burgerConstructorStyle['order-details__text'],
  burgerConstructorStyle['order-details__inactive-text']
);

const OrderDetails: FC = () => {
  const { order } = useRootSelector(selectOrder);

  return (
    order && (
      <div className={burgerConstructorStyle['order-details']}>
        <div className={orderNumberClasses}>{order.order.number}</div>
        <div className={orderIdentifierClasses}>идентификатор заказа</div>
        <div className={burgerConstructorStyle['order-details__image']}>
          <img src={doneImage} alt="done" />
        </div>
        <div className={orderStartTextClasses}>Ваш заказ начали готовить</div>
        <div className={inactiveTextClasses}>Дождитесь готовности на орбитальной станции</div>
      </div>
    )
  );
};

export default OrderDetails;
