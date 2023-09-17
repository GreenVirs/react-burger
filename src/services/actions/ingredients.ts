import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../api/ingredients';

export enum INGREDIENTS_ACTIONS_TYPE {
  GET = 'GET_INGREDIENTS',
}
export const GET_INGREDIENTS = createAsyncThunk(INGREDIENTS_ACTIONS_TYPE.GET, getIngredients);
