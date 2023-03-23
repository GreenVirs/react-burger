import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../models/ingridient';
import { CURRENT_INGREDIENT } from '../actions/current-ingredient';

export interface CurrentIngredientState {
  ingredient: Ingredient | null;
  isOpenModal: boolean;
}

export const initialState: CurrentIngredientState = {
  ingredient: null,
  isOpenModal: false,
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    [CURRENT_INGREDIENT.SET]: (state, action: PayloadAction<{ ingredient: Ingredient }>) => {
      state.ingredient = action.payload.ingredient;
      state.isOpenModal = true;
    },
    [CURRENT_INGREDIENT.CLEAR]: (state) => {
      state.ingredient = null;
      state.isOpenModal = false;
    },
  },
});

export const { SET, CLEAR } = currentIngredientSlice.actions;
export const currentIngredientReducer = currentIngredientSlice.reducer;
