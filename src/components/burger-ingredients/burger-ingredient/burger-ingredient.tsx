import { FC, useMemo } from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { selectConstructor } from '../../../services/reducers/constructor';
import PriceItem from '../../price-item/price-item';
import { Ingredient } from '../../../models/ingridient';
import ingredientsStyle from './burger-ingredient.module.scss';
import { useRootSelector } from '../../../hooks/use-root-selector';
import { routeIngredient } from '../../app-router/app-router';

interface Props {
  ingredient: Ingredient;
}

const BurgerIngredient: FC<Props> = ({ ingredient }) => {
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: 'add',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { bun, ingredients } = useRootSelector(selectConstructor);

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

  return (
    <li
      className={`pr-4 pl-4 pt-6 pb-10 ${ingredientsStyle.ingredient}`}
      ref={dragRef}
      data-cy-ingredient={ingredient._id}
    >
      <span className="pl-4 pr-4">
        <img src={ingredient.image} alt={ingredient.name} />
      </span>
      <PriceItem price={ingredient.price} />
      <Link
        to={routeIngredient(ingredient._id)}
        state={{ backgroundLocation: location }}
        className={ingredientsStyle['ingredient__btn-title']}
      >
        <h3 className={`mt-1 text text_type_main-default ${ingredientsStyle.ingredient__name}`}>
          {ingredient.name}
        </h3>
      </Link>
      {count !== null && (
        <Counter count={count} size="default" extraClass={ingredientsStyle.ingredient__count} />
      )}
    </li>
  );
};

export default BurgerIngredient;
