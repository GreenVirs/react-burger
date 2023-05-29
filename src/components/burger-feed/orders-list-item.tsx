import { FC } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Order } from '../../models/order';
import styles from './orders-list.module.scss';
import PriceItem from '../price-item/price-item';
import OrderIngredientsList from './order-ingredients-list';
import { useOrderPrice } from '../../hooks/use-order-price';
import { useOrderIngredients } from '../../hooks/use-order-ingredients';

interface PropsOrdersListItem {
  order: Order;
  to: (id: number | string) => string;
}
const OrdersListItem: FC<PropsOrdersListItem> = ({ order, to }) => {
  const location = useLocation();
  const ingredients = useOrderIngredients(order.ingredients);
  const price = useOrderPrice(ingredients);
  return (
    <NavLink
      to={{ pathname: to(order.number) }}
      state={{ backgroundLocation: location }}
      className={styles['orders-list-item']}
    >
      <div className={styles['orders-list-item__header']}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
      </div>
      <div className={styles['orders-list-item__title']}>{order.name}</div>
      <div className={styles['orders-list-item__footer']}>
        <OrderIngredientsList ingredients={ingredients} />
        <PriceItem price={price} />
      </div>
    </NavLink>
  );
};

export default OrdersListItem;
