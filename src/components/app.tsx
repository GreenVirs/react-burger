import { useEffect, useState } from 'react';
import AppHeader from './app-header/app-header';
import containerStyles from './app-container/app-container.module.scss';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import { Ingredient } from '../models/ingridient';
import { ingredientsApi } from '../api';

function App() {
  const [data, setData] = useState<Ingredient[]>([]);
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
        <BurgerIngredients items={data} />
        <BurgerConstructor items={data} />
      </main>
    </>
  );
}

export default App;
