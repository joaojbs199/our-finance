import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialRevenueState } from '@/src/store/state';
import { getRevenues } from '@/src/store/modules/revenue/asyncThunks';
import { IOpenRevenueDialogs } from '@/src/integration/data/models/flow/revenue/interfaces';
import {
  updateCreateRevenueError,
  updateIsOpenCreateRevenueDialog,
  updateIsOpenDeleteRevenueDialog,
  updateIsOpenUpdateRevenueDialog,
} from './reducer-helper';
import { IErrorState } from '@/src/store/interfaces';

const revenueSlice = createSlice({
  name: 'revenues',
  initialState: initialRevenueState,
  reducers: {
    setIsOpenCreateRevenueDialog: (state, action: PayloadAction<boolean>) => {
      return updateIsOpenCreateRevenueDialog(state, action);
    },
    setIsOpenUpdateRevenueDialog: (state, action: PayloadAction<IOpenRevenueDialogs>) => {
      return updateIsOpenUpdateRevenueDialog(state, action);
    },
    setIsOpenDeleteRevenueDialog: (state, action: PayloadAction<IOpenRevenueDialogs>) => {
      return updateIsOpenDeleteRevenueDialog(state, action);
    },
    setCreateRevenueError: (state, action: PayloadAction<IErrorState>) => {
      return updateCreateRevenueError(state, action);
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getRevenues.pending, (state) => {
        state.uiState.getRevenues.isLoading = true;
        state.uiState.getRevenues.error = { isError: false, errorMessage: '' };
      })
      .addCase(getRevenues.fulfilled, (state, action) => {
        state.uiState.getRevenues.isLoading = false;
        state.revenues = action.payload;
      })
      .addCase(getRevenues.rejected, (state, action) => {
        state.uiState.getRevenues.isLoading = false;
        state.uiState.getRevenues.error = {
          isError: true,
          errorMessage: action.payload || 'Something went wrong',
        };
      });
  },
});

const {
  setIsOpenUpdateRevenueDialog,
  setIsOpenDeleteRevenueDialog,
  setIsOpenCreateRevenueDialog,
  setCreateRevenueError,
} = revenueSlice.actions;

export const RevenueActions = {
  setIsOpenUpdateRevenueDialog,
  setIsOpenDeleteRevenueDialog,
  setIsOpenCreateRevenueDialog,
  setCreateRevenueError,
};

export default revenueSlice;
