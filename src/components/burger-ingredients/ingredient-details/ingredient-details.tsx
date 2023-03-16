import { FC } from 'react';
import IngredientAttributeList from './ingredient-attribute-list';
import { Ingredient } from '../../../models/ingridient';
import ingredientStyle from './ingredient-details.module.scss';

interface Props {
  ingredient: Ingredient;
}
const IngredientDetails: FC<Props> = ({ ingredient }) => (
  <div className={ingredientStyle['ingredient-details']}>
    <div className="pr-5 pl-5">
      <img src={ingredient.image_large} alt={ingredient.name} />
    </div>
    <span
      className={`mt-4 text text_type_main-medium ${ingredientStyle['ingredient-details__name']}`}
    >
      {ingredient.name}
    </span>
    <IngredientAttributeList extraClass="mt-8" ingredient={ingredient} />
  </div>
);

export default IngredientDetails;
