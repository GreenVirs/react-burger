import { FC, useCallback, useMemo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import IngredientsList from './ingredients-list';
import ConstructorIngredient from './constructor-ingredient';
import constructorStyles from './burger-constructor.module.scss';
import PriceItem from '../price-item/price-item';
import { Order } from '../../models/order';
import { AppDispatch, RootState } from '../../store';
import { ConstructorState, ADD_ITEM } from '../../services/reducers/constructor';
import { CREATE_ORDER } from '../../services/actions/order';
import { Ingredient } from '../../models/ingridient';

const constructorClasses = clsx('pt-25 pb-4', constructorStyles.constructor);
const resultClasses = clsx('mt-10', constructorStyles.result);

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bun, ingredients } = useSelector<RootState, ConstructorState & { order: Order | null }>(
    (state) => ({
      bun: state.builder.bun,
      ingredients: state.builder.ingredients,
      order: state.order.order,
    })
  );

  const [, dropTargetRef] = useDrop({
    accept: 'add',
    drop(item: Ingredient) {
      dispatch(ADD_ITEM({ ingredient: item }));
    },
  });

  const total = useMemo(() => {
    if (!ingredients) {
      return 0;
    }
    const totalIngredients = ingredients.reduce((acc, { ingredient }) => {
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
    ingredients.reduce((acc, { ingredient }) => {
      acc.push(ingredient._id);
      return acc;
    }, ingredientsList);

    if (bun !== null) {
      ingredientsList.push(bun._id);
    }
    dispatch(CREATE_ORDER({ ingredients: ingredientsList }));
  }, [dispatch, ingredients, bun]);

  return (
    <div className={constructorClasses} ref={dropTargetRef}>
      {bun && <ConstructorIngredient id={v4()} extraClass="mb-4" first ingredient={bun} />}
      <IngredientsList />
      {bun && <ConstructorIngredient id={v4()} extraClass="mt-4" last ingredient={bun} />}
      <div className={resultClasses}>
        <PriceItem large price={total} />
        <Button
          disabled={bun === null || ingredients.length === 0}
          onClick={onCreateOrder}
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
