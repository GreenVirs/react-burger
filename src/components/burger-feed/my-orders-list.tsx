import { FC } from 'react';
import { clsx } from 'clsx';
import { useRootSelector } from '../../hooks/use-root-selector';
import { selectMyOrders } from '../../services/reducers/order';
import styles from './orders-list.module.scss';
import OrdersListItem from './orders-list-item';
import { routeMyOrder, routeProfile } from '../app-router/app-router';

const OrdersList: FC = () => {
  const orders = useRootSelector(selectMyOrders);
  const to = (id: string | number) => `${routeProfile}/${routeMyOrder(id)}`;
  return (
    <div className={clsx('custom-scroll', styles['orders-list'])}>
      {orders.map((order) => (
        <OrdersListItem to={to} key={order.number} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
