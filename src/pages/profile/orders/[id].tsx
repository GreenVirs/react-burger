import AppMain from '../../../components/layout/app-main/app-main';
import AppCenterContainer from '../../../components/layout/app-center-container/app-center-container';
import OrderInfo from '../../../components/burger-feed/order-info';

const MyOrderPage = () => (
  <AppMain>
    <AppCenterContainer>
      <OrderInfo />
    </AppCenterContainer>
  </AppMain>
);

export default MyOrderPage;
