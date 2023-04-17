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

export const routeHome = '/';
export const routeIngredient = (id: string) => `/ingredients/${id}`;
export const routeProfile = '/profile';
export const routeLogin = '/login';
export const routeRegister = '/register';
export const routeForgotPassword = '/forgot-password';
export const routeResetPassword = '/reset-password';
export const routeLogout = '/logout';
const AppRouter: FC = () => {
  const location = useLocation();
  const state = location.state as {
    backgroundLocation?: Location;
  };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path={routeHome} element={<HomePage />} />
        <Route path={routeIngredient(':id')} element={<IngredientPage />} />
        <Route path={routeProfile} element={<OnlyAuth element={<ProfilePage />} />}>
          <Route index element={<UserForm />} />
        </Route>
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
          <Route path={routeIngredient(':id')} element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
