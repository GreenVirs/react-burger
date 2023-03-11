import React from 'react';
import AppHeader from "./components/AppHeader/app-header";
import containerStyles from './components/AppContainer/app-container.module.css';
import BurgerConstructor from "./components/BurgerConstructor/burger-constructor";
import BurgerIngredients from "./components/BurgerIngredients/burger-ingredients";
import appStyles from './App.module.css';
import { MOCK_DATA } from "./utils/data";

function App() {
  return (
    <>
      <AppHeader />
        <main className={`${containerStyles.container} ${appStyles.main}`}>
            <BurgerIngredients items={MOCK_DATA} />
            <BurgerConstructor items={MOCK_DATA} />
        </main>
    </>
  );
}

export default App;
