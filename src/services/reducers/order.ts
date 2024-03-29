import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, Order } from '../../models/order';
import { ORDER_ACTIONS_TYPE, CREATE_ORDER, GET_ORDER } from '../actions/order';
import { RootState } from '../../store';
import { ApiReturned, SocketOptions } from '../../api/common';

interface OrderSocketInfo {
  total: number;
  totalToday: number;
  orders: Order[];
}

export type OrderSocket = ApiReturned<OrderSocketInfo>;

export interface OrderState {
  order: IOrder | null;
  isLoading: boolean;
  isOpenModal: boolean;
  isSocketConnect: boolean;
  isMySocketConnect: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
  myOrders: Order[];
}

export const initialState: OrderState = {
  order: null,
  isLoading: false,
  isOpenModal: false,
  isSocketConnect: false,
  isMySocketConnect: false,
  orders: [],
  myOrders: [],
  total: 0,
  totalToday: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    [ORDER_ACTIONS_TYPE.CLEAR]: (state) => {
      state.order = null;
      state.isOpenModal = false;
    },
    // пустая функция для правильной типизации стора
    [ORDER_ACTIONS_TYPE.WS_ALL_CONNECT]: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{ url: string; options: SocketOptions }>
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) => {},

    [ORDER_ACTIONS_TYPE.WS_ALL_OPEN]: (state) => {
      state.isSocketConnect = true;
    },
    [ORDER_ACTIONS_TYPE.WS_ALL_CLOSE]: (state) => {
      state.isSocketConnect = false;
    },
    [ORDER_ACTIONS_TYPE.WS_ALL_MESSAGE]: (state, action: PayloadAction<MessageEvent>) => {
      const { success, ...info } = JSON.parse(
        (action.payload as MessageEvent<string>).data
      ) as OrderSocket;
      if (success) {
        ({
          orders: state.orders,
          total: state.total,
          totalToday: state.totalToday,
        } = info as OrderSocketInfo);
      }
    },
    // пустая функция для правильной типизации стора
    [ORDER_ACTIONS_TYPE.WS_ME_CONNECT]: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<{ url: string; options: SocketOptions }>
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) => {},
    [ORDER_ACTIONS_TYPE.WS_ME_OPEN]: (state) => {
      state.isMySocketConnect = true;
    },
    [ORDER_ACTIONS_TYPE.WS_ME_MESSAGE]: (state, action: PayloadAction<MessageEvent>) => {
      const { success, ...info } = JSON.parse(
        (action.payload as MessageEvent<string>).data
      ) as OrderSocket;
      if (success) {
        ({ orders: state.myOrders } = info as OrderSocketInfo);
      }
    },
    [ORDER_ACTIONS_TYPE.WS_ME_CLOSE]: (state) => {
      state.isMySocketConnect = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CREATE_ORDER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CREATE_ORDER.fulfilled, (state, action) => {
      const { success, ...order } = action.payload;
      if (success) {
        state.order = order as IOrder;
        state.isOpenModal = true;
      }
      state.isLoading = false;
    });
    builder.addCase(CREATE_ORDER.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GET_ORDER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GET_ORDER.fulfilled, (state, action) => {
      const { success, ...data } = action.payload;
      if (success) {
        const order = (data as { orders: Order[] }).orders[0] as Order;
        state.order = { name: order.name, order: { ...order } } as IOrder;
      }
      state.isLoading = false;
    });
    builder.addCase(GET_ORDER.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectOrder = (state: RootState) => state.order;
export const selectOrders = (state: RootState) => state.order.orders;
export const selectMyOrders = (state: RootState) => state.order.myOrders;
export const selectOrdersTotal = (state: RootState) => {
  const { total, totalToday } = state.order;
  return { total, totalToday };
};
export const {
  CLEAR_ORDER,
  WS_ALL_MESSAGE,
  WS_ALL_OPEN,
  WS_ME_MESSAGE,
  WS_ME_OPEN,
  WS_ALL_CONNECT,
  WS_ME_CONNECT,
  WS_ALL_CLOSE,
  WS_ME_CLOSE,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
