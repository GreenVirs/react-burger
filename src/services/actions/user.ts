import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUser,
  login,
  logout,
  updateUser,
  register,
  resetPassport,
  forgotPassport,
} from '../../api/auth';

export enum USER_ACTIONS_TYPE {
  IS_USER_CHECKED = 'IS_USER_CHECKED',
  SET = 'SET',
  GET = 'GET',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  UPDATE = 'UPDATE',
  FORGOT = 'FORGOT',
  RESET = 'RESET',
}
export const GET_USER = createAsyncThunk(USER_ACTIONS_TYPE.GET, getUser);
export const LOGIN_USER = createAsyncThunk(USER_ACTIONS_TYPE.LOGIN, login);
export const LOGOUT_USER = createAsyncThunk(USER_ACTIONS_TYPE.LOGOUT, logout);
export const UPDATE_USER = createAsyncThunk(USER_ACTIONS_TYPE.UPDATE, updateUser);
export const REGISTER_USER = createAsyncThunk(USER_ACTIONS_TYPE.REGISTER, register);
export const FORGOT_PASSWORD = createAsyncThunk(USER_ACTIONS_TYPE.FORGOT, forgotPassport);
export const RESET_PASSWORD = createAsyncThunk(USER_ACTIONS_TYPE.RESET, resetPassport);
