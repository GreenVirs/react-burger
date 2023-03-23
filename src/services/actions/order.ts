import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../models/order';
import { ordersApi } from '../../api';

export enum ORDER {
  CLEAR = 'CLEAR',
}

type ApiReturned = Order & { success: boolean };

export const CREATE_ORDER = createAsyncThunk<ApiReturned, { ingredients: string[] }>(
  'CREATE_ORDER',
  (data) => ordersApi.post<ApiReturned>(data)
);
