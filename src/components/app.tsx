import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from './app-header/app-header';
import containerStyles from './app-container/app-container.module.scss';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import { AppDispatch, RootState } from '../store';
import { GET_INGREDIENTS } from '../services/actions/ingredients';

function App() {
  const { isLoading } = useSelector<RootState, { isLoading: boolean }>((state) => ({
    isLoading: state.ingredients.isLoading,
  }));

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GET_INGREDIENTS());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={`${containerStyles.container} ${appStyles.main}`}>
        {isLoading ? (
          <span className="text text_type_main-default">Загрузка ингредиентов</span>
        ) : (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
    </>
  );
}

export default App;
