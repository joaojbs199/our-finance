import { configureStore } from '@reduxjs/toolkit';
import ownerSlice from '@/src/slices/owner/ownerSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      owner: ownerSlice.reducer,
    },
  });
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
