import { FC } from 'react';
import { clsx } from 'clsx';
import { useRootSelector } from '../../hooks/use-root-selector';
import { selectOrdersTotal } from '../../services/reducers/order';
import styles from './orders-count.module.scss';

const OrdersCount: FC = () => {
  const { totalToday, total } = useRootSelector(selectOrdersTotal);

  return (
    <div className={styles['orders-count']}>
      <div className={styles['orders-count__orders']}>
        <div>
          <div className={clsx('pb-6', 'text text_type_main-medium')}>Готовы:</div>
          <div className={styles['orders-count__orders__numbers']}>
            <span className="text text_type_digits-default text_color_success">034533</span>
            <span className="text text_type_digits-default text_color_success">034534</span>
            <span className="text text_type_digits-default text_color_success">034535</span>
            <span className="text text_type_digits-default text_color_success">034536</span>
            <span className="text text_type_digits-default text_color_success">034537</span>
          </div>
        </div>
        <div>
          <div className={clsx('pb-6', 'text text_type_main-medium')}>В работе:</div>
          <div className={styles['orders-count__orders__numbers']}>
            <span className="text text_type_digits-default">034538</span>
            <span className="text text_type_digits-default">034539</span>
            <span className="text text_type_digits-default">034540</span>
          </div>
        </div>
      </div>
      <div className={styles['orders-count__total']}>
        <span className="text text_type_main-medium">Выполнено за все время:</span>
        <span className={clsx('text text_type_digits-large', styles['orders-count__digits'])}>
          {total}
        </span>
      </div>
      <div className={styles['orders-count__total']}>
        <span className="text text_type_main-medium">Выполнено за все сегодня:</span>
        <span className={clsx('text text_type_digits-large', styles['orders-count__digits'])}>
          {totalToday}
        </span>
      </div>
    </div>
  );
};

export default OrdersCount;
