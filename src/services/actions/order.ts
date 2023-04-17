import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from '../../models/order';
import { createOrder } from '../../api/orders';
import { ApiReturned } from '../../api/common';

export enum ORDER_ACTIONS_TYPE {
  CLEAR = 'CLEAR',
  CREATE = 'CREATE',
}

export const CREATE_ORDER = createAsyncThunk<ApiReturned<IOrder>, { ingredients: string[] }>(
  ORDER_ACTIONS_TYPE.CREATE,
  (data) => createOrder(data)
);
