import { useMemo, useReducer } from 'react';
import AppHeader from './app-header/app-header';
import containerStyles from './app-container/app-container.module.scss';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import { Ingredient } from '../models/ingridient';
import { ingredientsApi } from '../api';
import { ConstructorContext, ConstructorContextType } from '../services/constructor-context';
import { reducer } from '../services/reducers/constructor';
import { useFetch } from '../hooks/use-fetch';

function App() {
  const [items, dispatch] = useReducer(reducer, { bun: null, ingredients: {} });
  const constructorContext = useMemo<ConstructorContextType>(
    () => ({ items, dispatch }),
    [items, dispatch]
  );

  const { data } = useFetch<Ingredient[]>(ingredientsApi.get, '');

  return (
    <>
      <AppHeader />
      <main className={`${containerStyles.container} ${appStyles.main}`}>
        <ConstructorContext.Provider value={constructorContext}>
          <BurgerIngredients items={data} />
          <BurgerConstructor />
        </ConstructorContext.Provider>
      </main>
    </>
  );
}

export default App;
