import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';
import { USER, GET_USER } from '../actions/user';

export interface UserState {
  isLoading: boolean;
  isUserChecked: boolean;
  user: IUser | null;
}

export const initialState: UserState = {
  isLoading: false,
  isUserChecked: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    [USER.IS_USER_CHECKED]: (state) => {
      state.isUserChecked = true;
    },
    [USER.SET]: (
      state,
      action: PayloadAction<{
        user: IUser | null;
      }>
    ) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GET_USER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GET_USER.fulfilled, (state, action) => {
      const { success, ...data } = action.payload;
      if (success) {
        state.user = (data as { user: IUser }).user;
      }
      state.isUserChecked = true;
      state.isLoading = false;
    });
    builder.addCase(GET_USER.rejected, (state) => {
      state.isUserChecked = true;
      state.isLoading = false;
    });
  },
});
export const { IS_USER_CHECKED, SET } = userSlice.actions;

export const userReducer = userSlice.reducer;
