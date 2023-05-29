import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers';
import { initialState as initialStateOrder } from '../services/reducers/order';
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
    }).concat(socketMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
