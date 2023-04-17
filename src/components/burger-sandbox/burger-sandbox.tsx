import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './burger-sandbox.module.css';

const BurgerSandbox = () => (
  <DndProvider backend={HTML5Backend}>
    <div className={styles.box}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  </DndProvider>
);

export default BurgerSandbox;
