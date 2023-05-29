import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { selectIngredients } from '../services/reducers/ingredients';
import { Ingredient } from '../models/ingridient';

export const useOrderIngredients = (ingredients: string[]) => {
  const { items } = useSelector(selectIngredients);
  return useMemo(
    () =>
      ingredients.reduce((acc, item) => {
        const ingredient = items.find((el) => el._id === item);
        if (ingredient) {
          acc.push(ingredient);
        }
        return acc;
      }, [] as Ingredient[]),
    [ingredients]
  );
};
