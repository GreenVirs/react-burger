import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AppHeader from './app-header/app-header';
import AppRouter, { routeLogin } from './app-router/app-router';
import { selectIngredients } from '../services/reducers/ingredients';
import { GET_INGREDIENTS } from '../services/actions/ingredients';
import AppModals from './modals/app-modals';
import { GET_USER } from '../services/actions/user';
import { IS_USER_CHECKED } from '../services/reducers/user';
import { clearToken } from '../api';
import { useRootSelector } from '../hooks/use-root-selector';
import { useAppDispatch } from '../hooks/use-app-dispatch';

function App() {
  const { isItemsLoaded } = useRootSelector(selectIngredients);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isItemsLoaded) {
      dispatch(GET_INGREDIENTS());
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(GET_USER())
        .catch(() => {
          clearToken();
          navigate(routeLogin);
        })
        .finally(() => {
          dispatch(IS_USER_CHECKED());
        });
    } else {
      dispatch(IS_USER_CHECKED());
    }
  }, []);

  return (
    <>
      <AppHeader />
      <AppRouter />
      <AppModals />
    </>
  );
}

export default App;
