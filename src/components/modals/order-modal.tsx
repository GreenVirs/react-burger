import { FC, useCallback } from 'react';
import Modal from '../modal/modal';
import OrderDetails from '../burger-constructor/order-details/order-details';
import { CLEAR_ITEMS } from '../../services/reducers/constructor';
import { CLEAR as CLEAR_ORDER, selectOrder } from '../../services/reducers/order';
import { useRootSelector } from '../../hooks/use-root-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

const OrderModal: FC = () => {
  const { isOpenModal } = useRootSelector(selectOrder);
  const dispatch = useAppDispatch();

  const onCloseModalOrder = useCallback(() => {
    dispatch(CLEAR_ITEMS());
    dispatch(CLEAR_ORDER());
  }, [dispatch]);
  return isOpenModal ? (
    <Modal onClose={onCloseModalOrder}>
      <OrderDetails />
    </Modal>
  ) : null;
};

export default OrderModal;
