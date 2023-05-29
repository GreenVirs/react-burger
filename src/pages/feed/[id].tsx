import OrderInfo from '../../components/burger-feed/order-info';
import AppMain from '../../components/layout/app-main/app-main';
import AppCenterContainer from '../../components/layout/app-center-container/app-center-container';

const FeedOrderPage = () => (
  <AppMain>
    <AppCenterContainer>
      <OrderInfo />
    </AppCenterContainer>
  </AppMain>
);

export default FeedOrderPage;
