import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from '../../models/order';
import { createOrder } from '../../api/orders';
import { ApiReturned } from '../../api/common';

export enum ORDER {
  CLEAR = 'CLEAR',
}

export const CREATE_ORDER = createAsyncThunk<ApiReturned<IOrder>, { ingredients: string[] }>(
  'CREATE_ORDER',
  (data) => createOrder(data)
);
