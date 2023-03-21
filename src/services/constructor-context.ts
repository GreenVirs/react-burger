import { createContext } from 'react';
import { Ingredient } from '../models/ingridient';
import { reducer, ReducerAction } from './reducers/constructor';

export interface ConstructorContextType {
  items: {
    bun: Ingredient | null;
    ingredients: Record<string, { ingredient: Ingredient }>;
  };
  dispatch: (action: ReducerAction) => void;
}

export const ConstructorContext = createContext<ConstructorContextType>({
  items: { bun: null, ingredients: {} },
  dispatch: (action) => reducer({ bun: null, ingredients: {} }, action),
});
