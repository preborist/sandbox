import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { geocodingApi, weatherApi } from './apis';
import calendarReducer from './calendarSlice';

export const store = configureStore({
  reducer: {
    [geocodingApi.reducerPath]: geocodingApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    calendar: calendarReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(geocodingApi.middleware, weatherApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
