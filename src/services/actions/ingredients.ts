import { createAsyncThunk } from '@reduxjs/toolkit';
import { ingredientsApi } from '../../api';
import { Ingredient } from '../../models/ingridient';

type ApiReturned = { success: boolean; data: Ingredient[] };

export const GET_INGREDIENTS = createAsyncThunk<ApiReturned>('GET_INGREDIENTS', () =>
  ingredientsApi.get<ApiReturned>()
);
