import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../api/auth';
import { AppDispatch } from '../store';
import { SET, IS_USER_CHECKED } from '../services/reducers/user';
import { routeLogin } from '../components/app-router/app-router';

const Logout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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
