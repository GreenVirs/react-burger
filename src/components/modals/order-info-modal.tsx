import { FC } from 'react';
import Modal from '../modal/modal';
import { useGoToBackgroundLocation } from '../../hooks/use-go-to-background-location';
import OrderInfo from '../burger-feed/order-info';

interface Props {
  back: string;
}
const OrderInfoModal: FC<Props> = ({ back }) => {
  const onCloseModalIngredient = useGoToBackgroundLocation(back);
  return (
    <Modal onClose={onCloseModalIngredient}>
      <OrderInfo />
    </Modal>
  );
};

export default OrderInfoModal;
