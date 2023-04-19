import { create as post, findOne, patch } from './common';
import { clearToken, returnError, setTokens } from './index';
import { IUser } from '../models/user';

interface IAuth {
  user: IUser;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}

const checkAuth = (success: boolean, otherData: IAuth | object) => {
  if (success) {
    const { user, accessToken, refreshToken } = otherData as IAuth;
    setTokens({ accessToken, refreshToken });
    return user;
  }
  return returnError('error');
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const { success, ...otherData } = await post<IAuth>('auth/login', data);
    return checkAuth(success, otherData);
  } catch (e) {
    return returnError(e);
  }
};
export const register = async (data: { email: string; password: string; name: string }) => {
  try {
    const { success, ...otherData } = await post<IAuth>('auth/register', data);
    return checkAuth(success, otherData);
  } catch (e) {
    return returnError(e);
  }
};

export const forgotPassport = (data: { email: string }) => post('password-reset', data);
export const resetPassport = (data: { password: string; token: string }) =>
  post('password-reset/reset', data);

export const logout = async () => {
  await post('auth/logout', { token: localStorage.getItem('refreshToken') });
  clearToken();
};

export const getUser = () => findOne<{ user: IUser }>('auth/user');
export const updateUser = (data: Partial<IUser>) => patch<{ user: IUser }>('auth/user', data);
