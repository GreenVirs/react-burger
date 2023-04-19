import { FC, useCallback, useMemo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { v4 } from 'uuid';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router';
import IngredientsList from './ingredients-list';
import ConstructorIngredient from './constructor-ingredient';
import constructorStyles from './burger-constructor.module.scss';
import PriceItem from '../price-item/price-item';
import { ADD_ITEM, selectConstructor } from '../../services/reducers/constructor';
import { CREATE_ORDER } from '../../services/actions/order';
import { Ingredient } from '../../models/ingridient';
import { selectUser } from '../../services/reducers/user';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useRootSelector } from '../../hooks/use-root-selector';
import { routeLogin } from '../app-router/app-router';

const constructorClasses = clsx('pt-25 pb-4', constructorStyles.constructor);
const resultClasses = clsx('mt-10', constructorStyles.result);

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useRootSelector(selectConstructor);
  const { user } = useRootSelector(selectUser);

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
      return totalIngredients + bun.price * 2;
    }

    return totalIngredients;
  }, [ingredients, bun]);

  const onCreateOrder = useCallback(() => {
    if (!user) {
      navigate(routeLogin);
      return;
    }
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
