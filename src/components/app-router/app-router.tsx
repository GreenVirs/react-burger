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

const AppRouter: FC = () => {
  const location = useLocation();
  const state = location.state as {
    backgroundLocation?: Location;
  };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />}>
          <Route index element={<UserForm />} />
        </Route>
        <Route path="/auth">
          <Route path="login" element={<OnlyUnAuth element={<LoginPage />} />} />
          <Route path="register" element={<OnlyUnAuth element={<RegisterPage />} />} />
          <Route path="forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage />} />} />
          <Route path="reset-password" element={<OnlyUnAuth element={<ResetPasswordPage />} />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
