import { v4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../models/ingridient';
import { CONSTRUCTOR_ACTIONS_TYPE } from '../actions/constructor';

export interface ConstructorState {
  bun: Ingredient | null;
  ingredients: { ingredient: Ingredient; id: string }[];
}

export const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  initialState,
  name: 'builder',
  reducers: {
    [CONSTRUCTOR_ACTIONS_TYPE.ADD_ITEM]: (
      state,
      action: PayloadAction<{
        ingredient: Ingredient;
      }>
    ) => {
      if (action.payload.ingredient.type === 'bun') {
        state.bun = action.payload.ingredient;
        return;
      }
      state.ingredients.push({
        id: v4(),
        ingredient: action.payload.ingredient,
      });
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
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload.id);
    },
    [CONSTRUCTOR_ACTIONS_TYPE.CLEAR_ITEMS]: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    [CONSTRUCTOR_ACTIONS_TYPE.SORT_ITEMS]: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const [target] = state.ingredients.splice(action.payload.from, 1);
      state.ingredients.splice(action.payload.to, 0, target);
    },
  },
});
export const { CLEAR_ITEMS, ADD_ITEM, REMOVE_ITEM, SORT_ITEMS } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
