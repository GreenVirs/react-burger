import { Route, Routes, useLocation } from 'react-router';
import { FC } from 'react';
import HomePage from '../../pages';
import ProfilePage from '../../pages/profile';
import IngredientPage from '../../pages/ingredients/[id]';
import IngredientModal from '../modals/ingredient-modal';
import LoginPage from '../../pages/auth/login';
import RegisterPage from '../../pages/auth/register';
import ForgotPasswordPage from '../../pages/auth/forgot-password';
import ResetPasswordPage from '../../pages/auth/reset-password';
import ErrorPage from '../../pages/error';
import { OnlyAuth, OnlyUnAuth } from '../protected-route-element/protected-route-element';
import UserForm from '../user-form';
import Logout from '../../pages/logout';
import FeedPage from '../../pages/feed';
import FeedOrderPage from '../../pages/feed/[id]';
import OrderInfoModal from '../modals/order-info-modal';
import MyOrdersPage from '../../pages/profile/orders';
import MyOrderPage from '../../pages/profile/orders/[id]';

export const routeHome = '/';
export const routeIngredient = (id: string) => `/ingredients/${id}`;
export const routeProfile = '/profile';
export const routeLogin = '/login';
export const routeRegister = '/register';
export const routeForgotPassword = '/forgot-password';
export const routeResetPassword = '/reset-password';
export const routeLogout = '/logout';
export const routeFeed = '/feed';
export const routeOrder = (id: string | number) => `/feed/${id}`;
export const routeMyOrders = 'orders';

export const routeMyOrder = (id: string | number) => `orders/${id}`;
const AppRouter: FC = () => {
  const location = useLocation();
  const state = location.state as {
    backgroundLocation?: Location;
  };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path={routeHome} element={<HomePage />} />
        <Route path={routeFeed} element={<FeedPage />} />
        <Route path={routeIngredient(':id')} element={<IngredientPage />} />
        <Route path={routeOrder(':id')} element={<FeedOrderPage />} />
        <Route path={routeProfile} element={<OnlyAuth element={<ProfilePage />} />}>
          <Route index element={<UserForm />} />
          <Route path={routeMyOrders} element={<MyOrdersPage />} />
        </Route>
        <Route path={`${routeProfile}/${routeMyOrder(':id')}`} element={<MyOrderPage />} />
        <Route path={routeLogin} element={<OnlyUnAuth element={<LoginPage />} />} />
        <Route path={routeRegister} element={<OnlyUnAuth element={<RegisterPage />} />} />
        <Route
          path={routeForgotPassword}
          element={<OnlyUnAuth element={<ForgotPasswordPage />} />}
        />
        <Route path={routeResetPassword} element={<OnlyUnAuth element={<ResetPasswordPage />} />} />
        <Route path={routeLogout} element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path={routeOrder(':id')} element={<OrderInfoModal back={routeFeed} />} />
          <Route
            path={`${routeProfile}/${routeMyOrder(':id')}`}
            element={<OrderInfoModal back={routeFeed} />}
          />
          <Route path={routeIngredient(':id')} element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
