import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import AppHeader from './app-header/app-header';
import containerStyles from './app-container/app-container.module.scss';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import { AppDispatch, RootState } from '../store';
import { GET_INGREDIENTS } from '../services/actions/ingredients';
import Modal from './modal/modal';
import IngredientDetails from './burger-ingredients/ingredient-details/ingredient-details';
import {
  CLEAR as CLEAR_CURRENT_INGREDIENT,
  CurrentIngredientState,
} from '../services/reducers/current-ingredient';
import { IngredientsState } from '../services/reducers/ingredients';
import OrderDetails from './burger-constructor/order-details/order-details';
import { CLEAR as CLEAR_ORDER, OrderState } from '../services/reducers/order';
import { CLEAR_ITEMS } from '../services/reducers/constructor';

function App() {
  const {
    ingredients: { isLoading },
    currentIngredient: { ingredient, isOpenModal: isOpenModalIngredient },
    order: { order, isOpenModal: isOpenModalOrder },
  } = useSelector<
    RootState,
    { ingredients: IngredientsState; currentIngredient: CurrentIngredientState; order: OrderState }
  >((state) => ({
    ingredients: state.ingredients,
    currentIngredient: state.currentIngredient,
    order: state.order,
  }));

  const dispatch = useDispatch<AppDispatch>();

  const onCloseModalIngredient = useCallback(() => {
    dispatch(CLEAR_CURRENT_INGREDIENT());
  }, [dispatch]);

  const onCloseModalOrder = useCallback(() => {
    dispatch(CLEAR_ITEMS());
    dispatch(CLEAR_ORDER());
  }, [dispatch]);

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
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
            {isOpenModalIngredient && ingredient !== null && (
              <Modal onClose={onCloseModalIngredient} title="Детали ингредиента">
                <IngredientDetails ingredient={ingredient} />
              </Modal>
            )}
            {isOpenModalOrder && order !== null && (
              <Modal onClose={onCloseModalOrder}>
                <OrderDetails order={order} />
              </Modal>
            )}
          </DndProvider>
        )}
      </main>
    </>
  );
}

export default App;
