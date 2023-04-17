import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiReturned } from '../../api/common';
import { getUser } from '../../api/auth';
import { IUser } from '../../models/user';

export enum USER {
  IS_USER_CHECKED = 'IS_USER_CHECKED',
  SET = 'SET',
}
export const GET_USER = createAsyncThunk<ApiReturned<{ user: IUser }>>('GET_USER', getUser);
