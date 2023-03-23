import { createSlice } from '@reduxjs/toolkit';
import { GET_INGREDIENTS } from '../actions/ingredients';
import { Ingredient } from '../../models/ingridient';

interface IngredientsState {
  isLoading: boolean;
  items: Ingredient[];
}

const initialState: IngredientsState = {
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
// export const ingredientsReducer = createReducer<IngredientsState, IngredientsReducerAction>(
//   initState,
//   {
//     [SET.type]: (state, action) => ({
//       ...state,
//       items: action.items,
//     }),
//     [GET.pending]: (state) => ({
//       ...state,
//       isLoading: true,
//     }),
//   }
// );

// (state = initState, action) => {
//   switch (action.type) {
//     case INGREDIENTS_ACTIONS.SET: {
//       return {
//         ...state,
//         items: action.items,
//       };
//     }
//     case INGREDIENTS_ACTIONS.LOAD: {
//       return {
//         ...state,
//         isLoading: action.isLoading,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// }
export const ingredientsReducer = ingredientsSlice.reducer;
