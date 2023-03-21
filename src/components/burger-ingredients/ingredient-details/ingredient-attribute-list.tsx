import { FC } from 'react';
import { clsx } from 'clsx';
import { Ingredient } from '../../../models/ingridient';
import IngredientAttribute from './ingredient-attribute';
import burgerIngredientsStyle from './ingredient-details.module.scss';

interface Props {
  ingredient: Ingredient;
  extraClass?: string;
}

const IngredientAttributeList: FC<Props> = ({ ingredient, extraClass }) => {
  const listClasses = clsx(burgerIngredientsStyle['ingredients-attributes'], extraClass);
  return (
    <div className={listClasses}>
      <IngredientAttribute value={ingredient.calories} title="Калории, ккал" />
      <IngredientAttribute value={ingredient.proteins} title="Белки, г" />
      <IngredientAttribute value={ingredient.fat} title="Жиры, г" />
      <IngredientAttribute value={ingredient.carbohydrates} title="Углеводы, г" />
    </div>
  );
};

IngredientAttributeList.defaultProps = {
  extraClass: undefined,
};

export default IngredientAttributeList;
