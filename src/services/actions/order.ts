import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder, Order } from '../../models/order';
import { createOrder, getOrder } from '../../api/orders';
import { ApiReturned } from '../../api/common';

export enum ORDER_ACTIONS_TYPE {
  CLEAR = 'CLEAR_ORDER',
  CREATE = 'CREATE_ORDER',
  GET = 'GET_ORDER',
  WS_ALL_OPEN = 'WS_ALL_OPEN',
  WS_ALL_CONNECT = 'WS_ALL_CONNECT',
  WS_ALL_MESSAGE = 'WS_ALL_MESSAGE',
  WS_ALL_ERROR = 'WS_ALL_ERROR',
  WS_ALL_CLOSE = 'WS_ALL_CLOSE',
  WS_ME_OPEN = 'WS_ME_OPEN',
  WS_ME_CONNECT = 'WS_ME_CONNECT',
  WS_ME_MESSAGE = 'WS_ME_MESSAGE',
  WS_ME_ERROR = 'WS_ME_ERROR',
  WS_ME_CLOSE = 'WS_ME_CLOSE',
}

export const CREATE_ORDER = createAsyncThunk<ApiReturned<IOrder>, { ingredients: string[] }>(
  ORDER_ACTIONS_TYPE.CREATE,
  createOrder
);
export const GET_ORDER = createAsyncThunk<ApiReturned<{ orders: Order[] }>, string>(
  ORDER_ACTIONS_TYPE.GET,
  getOrder
);

GET_ORDER.fulfilled;
