import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from '../../models/order';
import { createOrder } from '../../api/orders';
import { ApiReturned } from '../../api/common';

export enum ORDER_ACTIONS_TYPE {
  CLEAR = 'CLEAR',
  CREATE = 'CREATE',
  GET = 'GET',
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
  (data) => createOrder(data)
);
