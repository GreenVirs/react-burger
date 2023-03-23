import { createSlice } from '@reduxjs/toolkit';
import { Order } from '../../models/order';
import { ORDER, CREATE_ORDER } from '../actions/order';

export interface OrderState {
  order: Order | null;
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
    [ORDER.CLEAR]: (state) => {
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
        state.order = order;
        state.isOpenModal = true;
      }
      state.isLoading = false;
    });
    builder.addCase(CREATE_ORDER.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { CLEAR } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
