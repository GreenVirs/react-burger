import { initialState, userReducer, IS_USER_CHECKED, SET } from './user';
import {
  GET_USER,
  LOGIN_USER,
  REGISTER_USER,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  UPDATE_USER,
  LOGOUT_USER,
} from '../actions/user';
import { ApiReturned } from '../../api/common';
import { IUser } from '../../models/user';

global.fetch = jest.fn();

const mockUser: ApiReturned<{ user: IUser }> = { success: true, user: { email: '', name: '' } };

test('should return the initial state', () => {
  expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
});
test('should isUserChecked to be true', () => {
  expect(userReducer(initialState, IS_USER_CHECKED())).toEqual({
    ...initialState,
    isUserChecked: true,
  });
});

test('user must not be null', () => {
  expect(userReducer(initialState, SET({ user: mockUser.user }))).toEqual({
    ...initialState,
    user: mockUser.user,
  });
});

test('test GET_USER.pending', () => {
  expect(userReducer(initialState, GET_USER.pending)).toEqual({
    ...initialState,
    isLoading: true,
  });
});

test('test GET_USER.fulfilled', () => {
  expect(userReducer(initialState, GET_USER.fulfilled(mockUser, ''))).toEqual({
    ...initialState,
    isUserChecked: true,
    user: mockUser.user,
  });
});
test('test GET_USER.rejected', () => {
  expect(userReducer(initialState, GET_USER.rejected(new Error(), ''))).toEqual({
    ...initialState,
    isUserChecked: true,
  });
});

test('test LOGIN_USER.pending', () => {
  expect(userReducer(initialState, LOGIN_USER.pending)).toEqual({
    ...initialState,
    isLoading: true,
  });
});

test('test LOGIN_USER.fulfilled', () => {
  expect(
    userReducer(initialState, LOGIN_USER.fulfilled(mockUser.user, '', { email: '', password: '' }))
  ).toEqual({
    ...initialState,
    isUserChecked: true,
    user: mockUser.user,
  });
});
test('test LOGIN_USER.rejected', () => {
  expect(
    userReducer(initialState, LOGIN_USER.rejected(new Error(), '', { email: '', password: '' }))
  ).toEqual({
    ...initialState,
    isUserChecked: true,
  });
});
test('test REGISTER_USER.pending', () => {
  expect(userReducer(initialState, REGISTER_USER.pending)).toEqual({
    ...initialState,
    isLoading: true,
  });
});

test('test REGISTER_USER.fulfilled', () => {
  expect(
    userReducer(
      initialState,
      REGISTER_USER.fulfilled(mockUser.user, '', { email: '', password: '', name: '' })
    )
  ).toEqual({
    ...initialState,
    isUserChecked: true,
    user: mockUser.user,
  });
});
test('test REGISTER_USER.rejected', () => {
  expect(
    userReducer(
      initialState,
      REGISTER_USER.rejected(new Error(), '', { email: '', password: '', name: '' })
    )
  ).toEqual({
    ...initialState,
    isUserChecked: true,
  });
});
test('test FORGOT_PASSWORD.pending', () => {
  expect(userReducer(initialState, FORGOT_PASSWORD.pending)).toEqual({
    ...initialState,
    isLoading: true,
  });
});

test('test FORGOT_PASSWORD.fulfilled', () => {
  expect(
    userReducer(initialState, FORGOT_PASSWORD.fulfilled({ success: true }, '', { email: '' }))
  ).toEqual(initialState);
});
test('test FORGOT_PASSWORD.rejected', () => {
  expect(
    userReducer(initialState, FORGOT_PASSWORD.rejected(new Error(), '', { email: '' }))
  ).toEqual(initialState);
});
test('test RESET_PASSWORD.pending', () => {
  expect(userReducer(initialState, RESET_PASSWORD.pending)).toEqual({
    ...initialState,
    isLoading: true,
  });
});

test('test RESET_PASSWORD.fulfilled', () => {
  expect(
    userReducer(
      initialState,
      RESET_PASSWORD.fulfilled({ success: true }, '', { password: '', token: '' })
    )
  ).toEqual(initialState);
});
test('test RESET_PASSWORD.rejected', () => {
  expect(
    userReducer(initialState, RESET_PASSWORD.rejected(new Error(), '', { password: '', token: '' }))
  ).toEqual(initialState);
});
test('test UPDATE_USER.pending', () => {
  expect(userReducer(initialState, UPDATE_USER.pending)).toEqual({
    ...initialState,
    isLoading: true,
  });
});

test('test UPDATE_USER.fulfilled', () => {
  expect(
    userReducer(initialState, UPDATE_USER.fulfilled(mockUser, '', { email: '', name: '' }))
  ).toEqual({ ...initialState, isUserChecked: true, user: mockUser.user });
});
test('test UPDATE_USER.rejected', () => {
  expect(
    userReducer(initialState, UPDATE_USER.rejected(new Error(), '', { email: '', name: '' }))
  ).toEqual({ ...initialState, isUserChecked: true });
});
test('test LOGOUT_USER.pending', () => {
  expect(userReducer(initialState, LOGOUT_USER.pending)).toEqual({
    ...initialState,
    isLoading: true,
  });
});

test('test LOGOUT_USER.fulfilled', () => {
  expect(userReducer(initialState, LOGOUT_USER.fulfilled(undefined, ''))).toEqual({
    ...initialState,
    isUserChecked: true,
    user: null,
  });
});
test('test UPDATE_USER.rejected', () => {
  expect(userReducer(initialState, LOGOUT_USER.rejected(new Error(), ''))).toEqual({
    ...initialState,
    isUserChecked: true,
  });
});
