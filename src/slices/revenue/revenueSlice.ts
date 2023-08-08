import { createSlice } from '@reduxjs/toolkit';
import { initialRevenueState } from '@/src/store/state';
import { getRevenues } from '@/src/store/modules/revenue/asyncThunks';

const revenueSlice = createSlice({
  name: 'revenues',
  initialState: initialRevenueState,
  reducers: {},

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

export default revenueSlice;
