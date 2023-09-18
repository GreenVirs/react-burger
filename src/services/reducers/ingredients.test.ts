import { ingredientsReducer, initialState } from './ingredients';
import { GET_INGREDIENTS } from '../actions/ingredients';

global.fetch = jest.fn();

test('should return the initial state', () => {
  expect(ingredientsReducer(undefined, { type: undefined })).toEqual(initialState);
});

test('test GET_INGREDIENTS.pending', () => {
  expect(ingredientsReducer(initialState, GET_INGREDIENTS.pending)).toEqual({
    ...initialState,
    isLoading: true,
  });
});

test('test GET_INGREDIENTS.fulfilled', () => {
  expect(
    ingredientsReducer(initialState, GET_INGREDIENTS.fulfilled({ success: true, data: [] }, ''))
  ).toEqual({ ...initialState, isItemsLoaded: true });
});
test('test GET_INGREDIENTS.rejected', () => {
  expect(ingredientsReducer(initialState, GET_INGREDIENTS.rejected(new Error(), ''))).toEqual(
    initialState
  );
});
