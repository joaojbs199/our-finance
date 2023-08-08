import { configureStore } from '@reduxjs/toolkit';
import ownerSlice from '@/src/slices/owner/ownerSlice';
import { useDispatch } from 'react-redux';
import expenseSlice from '@/src/slices/expense/expenseSlice';
import configurationSlice from '../slices/configuration/configurationSlice';
import revenueSlice from '../slices/revenue/revenueSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      configuration: configurationSlice.reducer,
      owner: ownerSlice.reducer,
      expense: expenseSlice.reducer,
      revenue: revenueSlice.reducer,
    },
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
