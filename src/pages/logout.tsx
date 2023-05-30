import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { routeLogin } from '../components/app-router/app-router';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { LOGOUT_USER } from '../services/actions/user';

const Logout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(LOGOUT_USER()).then(() => {
      navigate(routeLogin);
    });
  }, []);

  return <div>Выход из системы</div>;
};

export default Logout;
