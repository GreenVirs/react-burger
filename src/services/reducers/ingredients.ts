import { createSlice } from '@reduxjs/toolkit';
import { GET_INGREDIENTS } from '../actions/ingredients';
import { Ingredient } from '../../models/ingridient';
import { RootState } from '../../store';

export interface IngredientsState {
  isLoading: boolean;
  isItemsLoaded: boolean;
  items: Ingredient[];
}

export const initialState: IngredientsState = {
  isLoading: false,
  isItemsLoaded: false,
  items: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GET_INGREDIENTS.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GET_INGREDIENTS.fulfilled, (state, { payload }) => {
      if (payload.success) {
        if (Array.isArray(payload.data)) {
          state.items = payload.data;
        }
        state.isItemsLoaded = true;
      }
      state.isLoading = false;
    });
    builder.addCase(GET_INGREDIENTS.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const selectIngredient = (id: string) => (state: RootState) => ({
  ingredient: state.ingredients.items.find((item) => item._id === id) || null,
});
export const selectIngredients = (state: RootState) => state.ingredients;

export const ingredientsReducer = ingredientsSlice.reducer;
