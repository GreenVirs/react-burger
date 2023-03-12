import React, {useEffect, useState} from 'react';
import AppHeader from "./components/AppHeader/app-header";
import containerStyles from './components/AppContainer/app-container.module.css';
import BurgerConstructor from "./components/BurgerConstructor/burger-constructor";
import BurgerIngredients from "./components/BurgerIngredients/burger-ingredients";
import appStyles from './App.module.css';
import { Ingredient } from "./models/ingridient";
import { ingredientsApi } from "./api";

function App() {
    const [data, setData] = useState<Ingredient[]>([]);
    useEffect(() => {
        ingredientsApi.get<{ success: boolean, data: Ingredient[] }>().then((res) => {
            if (res.success) {
                setData(res.data);
            }
        }).catch((error) => console.log(`Ошибка ${error}`))
    }, [])
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
