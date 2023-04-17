import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers';
import { initialState as initialStateOrder } from '../services/reducers/order';
import { initialState as initialStateIngredients } from '../services/reducers/ingredients';
import { initialState as initialStateConstructor } from '../services/reducers/constructor';
import { initialState as initialStateUser } from '../services/reducers/user';

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
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
