import { v4 } from 'uuid';
import { Ingredient } from '../../models/ingridient';
import { ConstructorContextType } from '../constructor-context';
import { CONSTRUCTOR_ACTIONS_TYPE } from '../actions/constructor';

export type ReducerAction =
  | {
      ingredient: Ingredient;
      type: CONSTRUCTOR_ACTIONS_TYPE.ADD_ITEM;
      id: string;
    }
  | {
      ingredient: Ingredient;
      type: CONSTRUCTOR_ACTIONS_TYPE.REMOVE_ITEM;
      id: string;
    }
  | {
      type: CONSTRUCTOR_ACTIONS_TYPE.CLEAR_ITEMS;
    };
export const reducer = (state: ConstructorContextType['items'], action: ReducerAction) => {
  switch (action.type) {
    case CONSTRUCTOR_ACTIONS_TYPE.ADD_ITEM: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          bun: action.ingredient,
        };
      }
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [v4()]: {
            ingredient: action.ingredient,
          },
        },
      };
    }
    case CONSTRUCTOR_ACTIONS_TYPE.REMOVE_ITEM: {
      if (action.ingredient.type === 'bun') {
        if (state.bun === null) {
          return state;
        }
        if (action.ingredient._id === state.bun._id) {
          return {
            ...state,
            bun: null,
          };
        }
        return state;
      }
      if (action.id in state.ingredients) {
        const ingredients = { ...state.ingredients };
        delete ingredients[action.id];
        return {
          ...state,
          ingredients,
        };
      }
      return state;
    }
    case CONSTRUCTOR_ACTIONS_TYPE.CLEAR_ITEMS: {
      return {
        ...state,
        bun: null,
        ingredients: {},
      };
    }
    default: {
      return state;
    }
  }
};
