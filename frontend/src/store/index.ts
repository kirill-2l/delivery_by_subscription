'use client';

import { cartReducer } from '@/shared/libs/features/cart/cart.slice';
import { configureStore } from '@reduxjs/toolkit';

export const createStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
