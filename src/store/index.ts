import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    ingredients: {
      items: [],
      isLoading: false,
    },
    builder: {
      ingredients: {},
      bun: null,
    },
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
