import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import AppHeader from './app-header/app-header';
import AppRouter from './app-router/app-router';
import { AppDispatch, RootState } from '../store';
import { IngredientsState } from '../services/reducers/ingredients';
import { GET_INGREDIENTS } from '../services/actions/ingredients';
import AppModals from './modals/app-modals';
import { GET_USER } from '../services/actions/user';
import { IS_USER_CHECKED } from '../services/reducers/user';
import { clearToken } from '../api';

function App() {
  const {
    ingredients: { isItemsLoaded },
  } = useSelector<RootState, { ingredients: IngredientsState }>((state) => ({
    ingredients: state.ingredients,
  }));

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

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
          navigate('/auth/login');
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
