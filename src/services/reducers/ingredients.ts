import { createSlice } from '@reduxjs/toolkit';
import { GET_INGREDIENTS } from '../actions/ingredients';
import { Ingredient } from '../../models/ingridient';

export interface IngredientsState {
  isLoading: boolean;
  items: Ingredient[];
}

export const initialState: IngredientsState = {
  isLoading: false,
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
        state.items = payload.data;
      }
      state.isLoading = false;
    });
    builder.addCase(GET_INGREDIENTS.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const ingredientsReducer = ingredientsSlice.reducer;
