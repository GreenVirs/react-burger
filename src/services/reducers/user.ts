import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';
import {
  USER_ACTIONS_TYPE,
  GET_USER,
  LOGIN_USER,
  REGISTER_USER,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  UPDATE_USER,
  LOGOUT_USER,
} from '../actions/user';
import { RootState } from '../../store';

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
    [USER_ACTIONS_TYPE.IS_USER_CHECKED]: (state) => {
      state.isUserChecked = true;
    },
    [USER_ACTIONS_TYPE.SET]: (
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

    builder.addCase(UPDATE_USER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UPDATE_USER.fulfilled, (state, action) => {
      const { success, ...data } = action.payload;
      if (success) {
        state.user = (data as { user: IUser }).user;
      }
      state.isUserChecked = true;
      state.isLoading = false;
    });
    builder.addCase(UPDATE_USER.rejected, (state) => {
      state.isUserChecked = true;
      state.isLoading = false;
    });

    builder.addCase(LOGIN_USER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LOGIN_USER.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUserChecked = true;
      state.isLoading = false;
    });
    builder.addCase(LOGIN_USER.rejected, (state) => {
      state.isUserChecked = true;
      state.isLoading = false;
    });
    builder.addCase(LOGOUT_USER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LOGOUT_USER.fulfilled, (state) => {
      state.user = null;
      state.isUserChecked = true;
      state.isLoading = false;
    });
    builder.addCase(LOGOUT_USER.rejected, (state) => {
      state.isUserChecked = true;
      state.isLoading = false;
    });

    builder.addCase(REGISTER_USER.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(REGISTER_USER.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUserChecked = true;
      state.isLoading = false;
    });
    builder.addCase(REGISTER_USER.rejected, (state) => {
      state.isUserChecked = true;
      state.isLoading = false;
    });

    builder.addCase(RESET_PASSWORD.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RESET_PASSWORD.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(RESET_PASSWORD.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(FORGOT_PASSWORD.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(FORGOT_PASSWORD.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(FORGOT_PASSWORD.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectUser = (state: RootState) => state.user;

export const { IS_USER_CHECKED, SET } = userSlice.actions;

export const userReducer = userSlice.reducer;
