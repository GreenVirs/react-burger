import { v4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../models/ingridient';
import { CONSTRUCTOR_ACTIONS_TYPE } from '../actions/constructor';

export type ConstructorReducerAction =
  | {
      type: CONSTRUCTOR_ACTIONS_TYPE.ADD_ITEM;
      id: string;
      ingredient: Ingredient;
    }
  | {
      type: CONSTRUCTOR_ACTIONS_TYPE.REMOVE_ITEM;
      ingredient: Ingredient;
      id: string;
    }
  | {
      type: CONSTRUCTOR_ACTIONS_TYPE.CLEAR_ITEMS;
    };

export interface ConstructorState {
  bun: Ingredient | null;
  ingredients: Record<string, { ingredient: Ingredient }>;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: {},
};

const constructorSlice = createSlice({
  initialState,
  name: 'builder',
  reducers: {
    [CONSTRUCTOR_ACTIONS_TYPE.ADD_ITEM]: (
      state,
      action: PayloadAction<{
        id: string;
        ingredient: Ingredient;
      }>
    ) => {
      if (action.payload.ingredient.type === 'bun') {
        state.bun = action.payload.ingredient;
        return;
      }
      state.ingredients = {
        ...state.ingredients,
        [v4()]: {
          ingredient: action.payload.ingredient,
        },
      };
    },
    [CONSTRUCTOR_ACTIONS_TYPE.REMOVE_ITEM]: (
      state,
      action: PayloadAction<{ ingredient: Ingredient; id: string }>
    ) => {
      if (action.payload.ingredient.type === 'bun') {
        if (state.bun === null) {
          return;
        }
        if (action.payload.ingredient._id === state.bun._id) {
          state.bun = null;
        }
        return;
      }
      if (action.payload.id in state.ingredients) {
        const ingredients = { ...state.ingredients };
        delete ingredients[action.payload.id];
        state.ingredients = ingredients;
      }
    },
    [CONSTRUCTOR_ACTIONS_TYPE.CLEAR_ITEMS]: (state) => {
      state.bun = null;
      state.ingredients = {};
    },
  },
});
export const { CLEAR_ITEMS, ADD_ITEM, REMOVE_ITEM } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
