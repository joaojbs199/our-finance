import { createSlice } from '@reduxjs/toolkit';
import { initialExpenseState } from '@/src/store/state';
import { getExpenses } from '@/src/store/modules/expense/asyncThunks';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: initialExpenseState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.uiState.getExpenses.isLoading = true;
        state.uiState.getExpenses.error = { isError: false, errorMessage: '' };
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.uiState.getExpenses.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.uiState.getExpenses.isLoading = false;
        state.uiState.getExpenses.error = {
          isError: true,
          errorMessage: action.error.message || 'Something went wrong',
        };
      });
  },
});

export default expenseSlice;
