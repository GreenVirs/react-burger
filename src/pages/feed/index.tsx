import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import AppMain from '../../components/layout/app-main/app-main';
import styles from '../../components/burger-sandbox/burger-sandbox.module.css';
import OrdersList from '../../components/burger-feed/orders-list';
import OrdersCount from '../../components/burger-feed/orders-count';
import {
  WS_ALL_CONNECT,
  WS_ALL_MESSAGE,
  WS_ALL_OPEN,
  WS_ALL_CLOSE,
} from '../../services/reducers/order';

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      WS_ALL_CONNECT({
        url: 'orders/all',
        options: {
          onOpen: () => dispatch(WS_ALL_OPEN()),
          onMessage: (event) => dispatch(WS_ALL_MESSAGE(event)),
        },
      })
    );
    return () => {
      dispatch(WS_ALL_CLOSE());
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
