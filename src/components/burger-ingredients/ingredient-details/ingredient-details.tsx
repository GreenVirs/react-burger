import { FC } from 'react';
import { useParams } from 'react-router';
import IngredientAttributeList from './ingredient-attribute-list';
import ingredientStyle from './ingredient-details.module.scss';
import { useRootSelector } from '../../../hooks/use-root-selector';
import { selectIngredient } from '../../../services/reducers/ingredients';

const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredient } = useRootSelector(selectIngredient(id as string));

  if (ingredient === null) {
    return null;
  }
  return (
    <div className={ingredientStyle['ingredient-details']}>
      <div className="pr-5 pl-5">
        <img src={ingredient.image_large} alt={ingredient.name} />
      </div>
      <span className={ingredientStyle['ingredient-details__name']}>{ingredient.name}</span>
      <IngredientAttributeList extraClass="mt-8" ingredient={ingredient} />
    </div>
  );
};

export default IngredientDetails;
