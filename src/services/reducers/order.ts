import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../models/order';
import { ORDER_ACTIONS_TYPE, CREATE_ORDER } from '../actions/order';
import { RootState } from '../../store';

export interface OrderState {
  order: IOrder | null;
  isLoading: boolean;
  isOpenModal: boolean;
}

export const initialState: OrderState = {
  order: null,
  isLoading: false,
  isOpenModal: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    [ORDER_ACTIONS_TYPE.CLEAR]: (state) => {
      state.order = null;
      state.isOpenModal = false;
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
  },
});

export const selectOrder = (state: RootState) => state.order;
export const { CLEAR } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
