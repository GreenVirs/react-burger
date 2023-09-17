import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers';
import {
  initialState as initialStateOrder,
  WS_ALL_CLOSE,
  WS_ALL_CONNECT,
  WS_ME_CLOSE,
  WS_ME_CONNECT,
} from '../services/reducers/order';
import { initialState as initialStateIngredients } from '../services/reducers/ingredients';
import { initialState as initialStateConstructor } from '../services/reducers/constructor';
import { initialState as initialStateUser } from '../services/reducers/user';
import { socketMiddleware } from '../services/middlewares/socketMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    ingredients: initialStateIngredients,
    builder: initialStateConstructor,
    order: initialStateOrder,
    user: initialStateUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      socketMiddleware({ init: WS_ALL_CONNECT, close: WS_ALL_CLOSE }),
      socketMiddleware({ init: WS_ME_CONNECT, close: WS_ME_CLOSE })
    ),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
