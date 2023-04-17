import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../api/ingredients';
import { ApiReturned } from '../../api/common';
import { Ingredient } from '../../models/ingridient';

export const GET_INGREDIENTS = createAsyncThunk<ApiReturned<{ data: Ingredient[] }>>(
  'GET_INGREDIENTS',
  () => getIngredients()
);
