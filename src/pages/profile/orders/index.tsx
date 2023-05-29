import { FC, useEffect } from 'react';
import { ORDER_ACTIONS_TYPE } from '../../../services/actions/order';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import MyOrdersList from '../../../components/burger-feed/my-orders-list';

const MyOrdersPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_ACTIONS_TYPE.WS_ME_CONNECT });
    return () => {
      dispatch({ type: ORDER_ACTIONS_TYPE.WS_ME_CLOSE });
    };
  }, []);

  return <MyOrdersList />;
};

export default MyOrdersPage;
