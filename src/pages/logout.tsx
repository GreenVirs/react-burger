import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { logout } from '../api/auth';
import { SET, IS_USER_CHECKED } from '../services/reducers/user';
import { routeLogin } from '../components/app-router/app-router';
import { useAppDispatch } from '../hooks/use-app-dispatch';

const Logout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    logout().then(() => {
      dispatch(SET({ user: null }));
      dispatch(IS_USER_CHECKED());
      navigate(routeLogin);
    });
  }, []);

  return <div>Выход из системы</div>;
};

export default Logout;
