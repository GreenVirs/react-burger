import {
  orderReducer,
  initialState,
  CLEAR_ORDER,
  WS_ALL_MESSAGE,
  WS_ALL_OPEN,
  WS_ME_MESSAGE,
  WS_ME_OPEN,
  WS_ALL_CLOSE,
  WS_ME_CLOSE,
} from './order';
import { GET_ORDER, CREATE_ORDER } from '../actions/order';

global.fetch = jest.fn();

test('should return the initial state', () => {
  expect(orderReducer(undefined, { type: undefined })).toEqual(initialState);
});
test('Должен очистить заказ', () => {
  expect(orderReducer(initialState, CLEAR_ORDER())).toEqual(initialState);
});
test('Должен открыть соединение', () => {
  expect(orderReducer(initialState, WS_ALL_OPEN())).toEqual({
    ...initialState,
    isSocketConnect: true,
  });
});
test('Должен закрыть соединение', () => {
  expect(
    orderReducer(
      {
        ...initialState,
        isSocketConnect: true,
      },
      WS_ALL_CLOSE()
    )
  ).toEqual({
    ...initialState,
    isSocketConnect: false,
  });
});
test('Должен получить сообщение', () => {
  expect(
    orderReducer(
      initialState,
      WS_ALL_MESSAGE({
        data: JSON.stringify({
          success: true,
          orders: [],
          total: 1,
          totalToday: 1,
        }),
      } as MessageEvent<any>)
    )
  ).toEqual({
    ...initialState,
    orders: [],
    total: 1,
    totalToday: 1,
  });
});
test('Должен открыть соединение моих заказов', () => {
  expect(orderReducer(initialState, WS_ME_OPEN())).toEqual({
    ...initialState,
    isMySocketConnect: true,
  });
});
test('Должен закрыть соединение моих заказов', () => {
  expect(
    orderReducer(
      {
        ...initialState,
        isMySocketConnect: true,
      },
      WS_ME_CLOSE()
    )
  ).toEqual({
    ...initialState,
    isMySocketConnect: false,
  });
});
test('Должен получить сообщение моих заказов', () => {
  expect(
    orderReducer(
      initialState,
      WS_ME_MESSAGE({
        data: JSON.stringify({
          success: true,
          orders: [],
        }),
      } as MessageEvent<any>)
    )
  ).toEqual({
    ...initialState,
    myOrders: [],
  });
});

test('test GET_ORDER.pending', () => {
  expect(
    // @ts-ignore
    orderReducer(initialState, GET_ORDER.pending)
  ).toEqual({ ...initialState, isLoading: true });
});

test('test GET_ORDER.fulfilled', () => {
  expect(
    orderReducer(
      initialState,
      GET_ORDER.fulfilled(
        {
          success: true,
          orders: [
            {
              ingredients: [],
              updatedAt: '',
              status: 'pending',
              name: '',
              number: 0,
              createdAt: '',
            },
          ],
        },
        '',
        '123'
      )
    )
  ).toEqual({
    ...initialState,
    order: {
      name: '',
      order: {
        ingredients: [],
        updatedAt: '',
        status: 'pending',
        name: '',
        number: 0,
        createdAt: '',
      },
    },
  });
});
test('test GET_ORDER.rejected', () => {
  expect(
    // @ts-ignore
    orderReducer(initialState, GET_ORDER.rejected())
  ).toEqual(initialState);
});

test('test CREATE_ORDER.pending', () => {
  expect(
    // @ts-ignore
    orderReducer(initialState, CREATE_ORDER.pending)
  ).toEqual({ ...initialState, isLoading: true });
});

test('test CREATE_ORDER.fulfilled', () => {
  expect(
    orderReducer(
      initialState,
      CREATE_ORDER.fulfilled(
        {
          success: true,
          order: {
            ingredients: [],
            updatedAt: '',
            status: 'pending',
            name: '',
            number: 0,
            createdAt: '',
          },
          name: '',
        },
        '',
        { ingredients: [] }
      )
    )
  ).toEqual({
    ...initialState,
    isOpenModal: true,
    order: {
      order: {
        ingredients: [],
        updatedAt: '',
        status: 'pending',
        name: '',
        number: 0,
        createdAt: '',
      },
      name: '',
    },
  });
});
test('test CREATE_ORDER.rejected', () => {
  expect(
    orderReducer(initialState, CREATE_ORDER.rejected(new Error(), '', { ingredients: [] }))
  ).toEqual(initialState);
});
