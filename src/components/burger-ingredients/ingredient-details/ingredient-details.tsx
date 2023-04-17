import { FC } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import IngredientAttributeList from './ingredient-attribute-list';
import { Ingredient } from '../../../models/ingridient';
import ingredientStyle from './ingredient-details.module.scss';
import { RootState } from '../../../store';

const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredient } = useSelector<RootState, { ingredient: Ingredient | null }>((state) => {
    const ingredients = state.ingredients.items;
    return { ingredient: ingredients.find((item) => item._id === id) || null };
  });
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
