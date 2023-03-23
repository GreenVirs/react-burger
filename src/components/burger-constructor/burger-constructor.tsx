import { FC, useCallback, useMemo, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import IngredientsList from './ingredients-list';
import ConstructorIngredient from './constructor-ingredient';
import constructorStyles from './burger-constructor.module.scss';
import PriceItem from '../price-item/price-item';
import OrderDetails from './order-details/order-details';
import Modal from '../modal/modal';
import { useModalControl } from '../../hooks/use-modal-control';
import { ordersApi } from '../../api';
import { Order } from '../../models/order';
import { RootState } from '../../store';
import { ConstructorState, CLEAR_ITEMS } from '../../services/reducers/constructor';

const constructorClasses = clsx('pt-25 pb-4', constructorStyles.constructor);
const resultClasses = clsx('mt-10', constructorStyles.result);

const BurgerConstructor: FC = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModalControl(false);
  const [order, setOrder] = useState<Order | null>(null);
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector<RootState, ConstructorState>((state) => ({
    bun: state.builder.bun,
    ingredients: state.builder.ingredients,
  }));

  const total = useMemo(() => {
    if (!ingredients) {
      return 0;
    }
    const totalIngredients = Object.values(ingredients).reduce((acc, { ingredient }) => {
      acc += ingredient.price;
      return acc;
    }, 0);

    if (bun !== null) {
      return totalIngredients + bun.price;
    }

    return totalIngredients;
  }, [ingredients, bun]);

  const onCreateOrder = useCallback(() => {
    const ingredientsList = [] as string[];
    if (bun !== null) {
      ingredientsList.push(bun._id);
    }
    Object.values(ingredients).reduce((acc, { ingredient }) => {
      acc.push(ingredient._id);
      return acc;
    }, ingredientsList);

    if (bun !== null) {
      ingredientsList.push(bun._id);
    }
    ordersApi
      .post<Order & { success: boolean }>({
        ingredients,
      })
      .then((res) => {
        const { success, ...newOrder } = res;
        if (success) {
          setOrder(newOrder);
          onOpenModal();
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(`Ошибка ${e}`);
      });
  }, [ingredients, bun, onOpenModal]);

  const onClose = useCallback(() => {
    onCloseModal();
    setOrder(null);
    dispatch(CLEAR_ITEMS());
  }, [onCloseModal, setOrder, dispatch]);

  return (
    <div className={constructorClasses}>
      {bun && <ConstructorIngredient id={v4()} extraClass="mb-4" first ingredient={bun} />}
      <IngredientsList />
      {bun && <ConstructorIngredient id={v4()} extraClass="mt-4" last ingredient={bun} />}
      <div className={resultClasses}>
        <PriceItem large price={total} />
        <Button
          disabled={bun === null || (ingredients && Object.values(ingredients).length === 0)}
          onClick={onCreateOrder}
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
      {isOpen && order !== null && (
        <Modal onClose={onClose}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
