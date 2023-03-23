import { Reducer } from 'redux';
import { Ingredient } from '../../models/ingridient';
import { CURRENT_INGREDIENT } from '../actions/current-ingredient';

export interface CurrentIngredientState {
  ingredient: Ingredient | null;
}

const initState = {
  ingredient: null,
};

export type CurrentIngredientAction =
  | {
      type: CURRENT_INGREDIENT.SET;
      ingredient: Ingredient;
    }
  | {
      type: CURRENT_INGREDIENT.CLEAR;
    };

export const currentIngredientReducer: Reducer<CurrentIngredientState, CurrentIngredientAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    case CURRENT_INGREDIENT.SET: {
      return {
        ...state,
        ingredient: action.ingredient,
      };
    }
    case CURRENT_INGREDIENT.CLEAR: {
      return {
        ...state,
        ...initState,
      };
    }
    default: {
      return state;
    }
  }
};
