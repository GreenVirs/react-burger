import { FC } from 'react';
import { clsx } from 'clsx';
import { useRootSelector } from '../../hooks/use-root-selector';
import { selectOrders } from '../../services/reducers/order';
import styles from './orders-list.module.scss';
import OrdersListItem from './orders-list-item';
import { routeOrder } from '../app-router/app-router';

const OrdersList: FC = () => {
  const orders = useRootSelector(selectOrders);

  return (
    <div className={clsx('custom-scroll', styles['orders-list'])}>
      {orders.map((order) => (
        <OrdersListItem to={routeOrder} key={order.number} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
