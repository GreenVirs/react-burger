import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../api/auth';

export enum USER_ACTIONS_TYPE {
  IS_USER_CHECKED = 'IS_USER_CHECKED',
  SET = 'SET',
  GET = 'GET',
}
export const GET_USER = createAsyncThunk(USER_ACTIONS_TYPE.GET, getUser);
