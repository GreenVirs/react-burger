import { FC, useEffect } from 'react';
import { ORDER_ACTIONS_TYPE } from '../../services/actions/order';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import AppMain from '../../components/layout/app-main/app-main';
import styles from '../../components/burger-sandbox/burger-sandbox.module.css';
import OrdersList from '../../components/burger-feed/orders-list';
import OrdersCount from '../../components/burger-feed/orders-count';

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_ACTIONS_TYPE.WS_ALL_CONNECT });
    return () => {
      dispatch({ type: ORDER_ACTIONS_TYPE.WS_ALL_CLOSE });
    };
  }, []);

  return (
    <AppMain>
      <div className={styles.box}>
        <OrdersList />
        <OrdersCount />
      </div>
    </AppMain>
  );
};

export default FeedPage;
