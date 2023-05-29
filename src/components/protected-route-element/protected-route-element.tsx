import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router';
import { selectUser } from '../../services/reducers/user';
import AppLoader from '../app-loader/app-loader';
import { useRootSelector } from '../../hooks/use-root-selector';
import { routeHome, routeLogin } from '../app-router/app-router';

interface IProtectedRouteElement {
  onlyUnAuth?: boolean;
  element: ReactElement | null;
}
const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element, onlyUnAuth = false }) => {
  const { isUserChecked, user } = useRootSelector(selectUser);
  const location = useLocation();
  if (!isUserChecked) {
    return <AppLoader>Загрузка пользователя</AppLoader>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: routeHome } };
    return <Navigate to={from ?? routeHome} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={routeLogin} state={{ from: location }} />;
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
