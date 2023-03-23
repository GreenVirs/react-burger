import { FC, useCallback, useMemo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ConstructorState } from '../../../services/reducers/constructor';
import PriceItem from '../../price-item/price-item';
import { Ingredient } from '../../../models/ingridient';
import ingredientsStyle from './burger-ingredient.module.scss';
import { RootState } from '../../../store';
import { SET } from '../../../services/reducers/current-ingredient';

interface Props {
  ingredient: Ingredient;
}

const BurgerIngredient: FC<Props> = ({ ingredient }) => {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'add',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const { bun, ingredients } = useSelector<RootState, ConstructorState>((state) => ({
    ...state.builder,
  }));
  const count = useMemo<number | null>(() => {
    if (ingredient.type !== 'bun') {
      const itemsList = ingredients.filter((item) => item.ingredient._id === ingredient._id);
      return itemsList.length || null;
    }

    if (bun === null) {
      return null;
    }
    return ingredient._id === bun._id ? 1 : null;
  }, [ingredients, bun, ingredient]);

  const onClickItem = useCallback(() => {
    dispatch(SET({ ingredient }));
  }, [dispatch, ingredient]);

  return (
    <li className={`pr-4 pl-4 pt-6 pb-10 ${ingredientsStyle.ingredient}`} ref={dragRef}>
      <span className="pl-4 pr-4">
        <img src={ingredient.image} alt={ingredient.name} />
      </span>
      <PriceItem price={ingredient.price} />
      <button
        type="button"
        onClick={onClickItem}
        className={ingredientsStyle['ingredient__btn-title']}
      >
        <h3 className={`mt-1 text text_type_main-default ${ingredientsStyle.ingredient__name}`}>
          {ingredient.name}
        </h3>
      </button>
      {count !== null && (
        <Counter count={count} size="default" extraClass={ingredientsStyle.ingredient__count} />
      )}
    </li>
  );
};

export default BurgerIngredient;
