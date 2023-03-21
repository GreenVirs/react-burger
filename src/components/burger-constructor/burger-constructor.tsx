import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { v4 } from 'uuid';
import IngredientsList from './ingredients-list';
import ConstructorIngredient from './constructor-ingredient';
import constructorStyles from './burger-constructor.module.scss';
import PriceItem from '../price-item/price-item';
import OrderDetails from './order-details/order-details';
import Modal from '../modal/modal';
import { useModalControl } from '../../hooks/use-modal-control';
import { ConstructorContext } from '../../services/constructor-context';
import { ordersApi } from '../../api';
import { Order } from '../../models/order';
import { CONSTRUCTOR_ACTIONS_TYPE } from '../../services/actions/constructor';

const constructorClasses = clsx('pt-25 pb-4', constructorStyles.constructor);
const resultClasses = clsx('mt-10', constructorStyles.result);

const BurgerConstructor: FC = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModalControl(false);
  const [order, setOrder] = useState<Order | null>(null);
  const { items, dispatch } = useContext(ConstructorContext);

  const total = useMemo(() => {
    const totalIngredients = Object.values(items.ingredients).reduce((acc, { ingredient }) => {
      acc += ingredient.price;
      return acc;
    }, 0);

    if (items.bun !== null) {
      return totalIngredients + items.bun.price;
    }

    return totalIngredients;
  }, [items.ingredients, items.bun]);

  const onCreateOrder = useCallback(() => {
    const ingredients = [] as string[];
    if (items.bun !== null) {
      ingredients.push(items.bun._id);
    }

    Object.values(items.ingredients).reduce((acc, { ingredient }) => {
      acc.push(ingredient._id);
      return acc;
    }, ingredients);

    if (items.bun !== null) {
      ingredients.push(items.bun._id);
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
  }, [items.ingredients, items.bun, onOpenModal]);

  const onClose = useCallback(() => {
    onCloseModal();
    setOrder(null);
    dispatch({ type: CONSTRUCTOR_ACTIONS_TYPE.CLEAR_ITEMS });
  }, [onCloseModal, setOrder, dispatch]);

  return (
    <div className={constructorClasses}>
      {items.bun && (
        <ConstructorIngredient id={v4()} extraClass="mb-4" first ingredient={items.bun} />
      )}
      <IngredientsList />
      {items.bun && (
        <ConstructorIngredient id={v4()} extraClass="mt-4" last ingredient={items.bun} />
      )}
      <div className={resultClasses}>
        <PriceItem large price={total} />
        <Button
          disabled={items.bun === null || Object.values(items.ingredients).length === 0}
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
