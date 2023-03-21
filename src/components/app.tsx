import { useEffect, useMemo, useReducer, useState } from 'react';
import AppHeader from './app-header/app-header';
import containerStyles from './app-container/app-container.module.scss';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import { Ingredient } from '../models/ingridient';
import { ingredientsApi } from '../api';
import { ConstructorContext, ConstructorContextType } from '../services/constructor-context';
import { reducer } from '../services/reducers/constructor';

function App() {
  const [data, setData] = useState<Ingredient[]>([]);
  const [items, dispatch] = useReducer(reducer, { bun: null, ingredients: {} });
  const constructorContext = useMemo<ConstructorContextType>(
    () => ({ items, dispatch }),
    [items, dispatch]
  );
  useEffect(() => {
    ingredientsApi
      .get<{ success: boolean; data: Ingredient[] }>()
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(`Ошибка ${error}`));
  }, []);
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
