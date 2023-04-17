import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router';
import { RootState } from '../../store';
import { UserState } from '../../services/reducers/user';
import AppLoader from '../app-loader/app-loader';

interface IProtectedRouteElement {
  onlyUnAuth?: boolean;
  element: ReactElement | null;
}
const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element, onlyUnAuth = false }) => {
  const {
    user: { isUserChecked, user },
  } = useSelector<RootState, { user: UserState }>((state) => ({
    user: state.user,
  }));
  const location = useLocation();
  if (!isUserChecked) {
    return <AppLoader>Загрузка пользователя</AppLoader>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from ?? '/'} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

ProtectedRouteElement.defaultProps = {
  onlyUnAuth: false,
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: FC<{ element: ReactElement | null }> = ({ element }) => (
  <ProtectedRouteElement onlyUnAuth element={element} />
);
