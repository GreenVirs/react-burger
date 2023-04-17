import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modal/modal';
import OrderDetails from '../burger-constructor/order-details/order-details';
import { CLEAR_ITEMS } from '../../services/reducers/constructor';
import { CLEAR as CLEAR_ORDER, OrderState } from '../../services/reducers/order';
import { AppDispatch, RootState } from '../../store';

const OrderModal: FC = () => {
  const {
    order: { isOpenModal: isOpenModalOrder },
  } = useSelector<RootState, { order: OrderState }>((state) => ({
    order: state.order,
  }));
  const dispatch = useDispatch<AppDispatch>();

  const onCloseModalOrder = useCallback(() => {
    dispatch(CLEAR_ITEMS());
    dispatch(CLEAR_ORDER());
  }, [dispatch]);
  return isOpenModalOrder ? (
    <Modal onClose={onCloseModalOrder}>
      <OrderDetails />
    </Modal>
  ) : null;
};

export default OrderModal;
