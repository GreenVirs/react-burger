import { useMemo } from 'react';
import { Ingredient } from '../models/ingridient';

export const useOrderPrice = (ingredients: Ingredient[]) =>
  useMemo(
    () =>
      ingredients.reduce((acc, item) => {
        acc += item.price;
        return acc;
      }, 0),
    [ingredients]
  );
