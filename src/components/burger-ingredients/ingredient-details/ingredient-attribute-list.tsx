import { FC } from 'react';
import { Ingredient } from '../../../models/ingridient';
import IngredientAttribute from './ingredient-attribute';
import burgerIngredientsStyle from './ingredient-details.module.scss';

interface Props {
  ingredient: Ingredient;
  extraClass?: string;
}

const IngredientAttributeList: FC<Props> = ({ ingredient, extraClass }) => (
  <div
    className={`${burgerIngredientsStyle['ingredients-attributes']}${
      extraClass ? ` ${extraClass}` : ''
    }`}
  >
    <IngredientAttribute value={ingredient.calories} title="Калории, ккал" />
    <IngredientAttribute value={ingredient.proteins} title="Белки, г" />
    <IngredientAttribute value={ingredient.fat} title="Жиры, г" />
    <IngredientAttribute value={ingredient.carbohydrates} title="Углеводы, г" />
  </div>
);

IngredientAttributeList.defaultProps = {
  extraClass: undefined,
};

export default IngredientAttributeList;
