import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import MyOrdersList from '../../../components/burger-feed/my-orders-list';
import {
  WS_ME_CLOSE,
  WS_ME_CONNECT,
  WS_ME_MESSAGE,
  WS_ME_OPEN,
} from '../../../services/reducers/order';
import { getToken } from '../../../api';

const MyOrdersPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      WS_ME_CONNECT({
        url: `orders?token=${getToken()}`,
        options: {
          onOpen: () => dispatch(WS_ME_OPEN()),
          onMessage: (event) => dispatch(WS_ME_MESSAGE(event)),
        },
      })
    );
    return () => {
      dispatch(WS_ME_CLOSE());
    };
  }, []);

  return <MyOrdersList />;
};

export default MyOrdersPage;
