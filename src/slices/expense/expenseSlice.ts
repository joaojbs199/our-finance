import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialExpenseState } from '@/src/store/state';
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
  updateExpenseStatus,
} from '@/src/store/modules/expense/asyncThunks';
import {
  updateCreateExpenseIsDone,
  updateCreateExpenseIsLoading,
  updateExpenses,
  updateIsOpenCreateExpenseDialog,
  updateIsOpenUpdateExpenseDialog,
  updateCreateExpenseError,
  updateUpdateExpenseIsDone,
  updateUpdateExpenseIsLoading,
  updateIsOpenDeleteExpenseDialog,
  updateDeleteExpenseIsLoading,
  updateDeleteExpenseIsDone,
} from './reducer-helper';
import { IOpenExpenseDialogs } from '@/src/integration/data/models/flow/expense/interfaces';
import { IErrorState } from '@/src/store/interfaces';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: initialExpenseState,
  reducers: {
    setIsOpenUpdateExpenseDialog: (state, action: PayloadAction<IOpenExpenseDialogs>) => {
      return updateIsOpenUpdateExpenseDialog(state, action);
    },
    setIsOpenCreateExpenseDialog: (state, action: PayloadAction<boolean>) => {
      return updateIsOpenCreateExpenseDialog(state, action);
    },
    setIsOpenDeleteExpenseDialog: (state, action: PayloadAction<IOpenExpenseDialogs>) => {
      return updateIsOpenDeleteExpenseDialog(state, action);
    },
    setUpdateExpenseIsLoading: (state, action: PayloadAction<boolean>) => {
      return updateUpdateExpenseIsLoading(state, action);
    },
    setUpdateExpenseIsDone: (state, action: PayloadAction<boolean>) => {
      return updateUpdateExpenseIsDone(state, action);
    },
    setDeleteExpenseIsLoading: (state, action: PayloadAction<boolean>) => {
      return updateDeleteExpenseIsLoading(state, action);
    },
    setDeleteExpenseIsDone: (state, action: PayloadAction<boolean>) => {
      return updateDeleteExpenseIsDone(state, action);
    },
    setCreateExpenseError: (state, action: PayloadAction<IErrorState>) => {
      return updateCreateExpenseError(state, action);
    },
    setCreateExpenseIsLoading: (state, action: PayloadAction<boolean>) => {
      return updateCreateExpenseIsLoading(state, action);
    },
    setCreateExpenseIsDone: (state, action: PayloadAction<boolean>) => {
      return updateCreateExpenseIsDone(state, action);
    },
  },

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
          errorMessage: action.payload || 'Something went wrong',
        };
      });

    builder
      .addCase(createExpense.pending, (state) => {
        state.uiState.createExpense.isLoading = true;
        state.uiState.createExpense.error = { isError: false, errorMessage: '' };
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .addCase(createExpense.fulfilled, (state, action) => {})

      .addCase(createExpense.rejected, (state, action) => {
        state.uiState.createExpense.isLoading = false;
        state.uiState.createExpense.error = {
          isError: true,
          errorMessage: action.payload || 'Something went wrong',
        };
      });

    builder
      .addCase(updateExpense.pending, (state) => {
        state.uiState.updateExpense.isLoading = true;
        state.uiState.updateExpense.error = { isError: false, errorMessage: '' };
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const updatedExpenses = updateExpenses(state.expenses.data, action.payload);
        state.expenses.data = updatedExpenses;
        state.uiState.dialogs.updateExpenseDialog = { isOpen: false, expenseId: 0 };
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.uiState.updateExpense.isLoading = false;
        state.uiState.updateExpense.error = {
          isError: true,
          errorMessage: action.payload || 'Something went wrong',
        };
      });

    builder
      .addCase(deleteExpense.pending, (state) => {
        state.uiState.deleteExpense.isLoading = true;
        state.uiState.deleteExpense.error = { isError: false, errorMessage: '' };
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .addCase(deleteExpense.fulfilled, (state, action) => {})

      .addCase(deleteExpense.rejected, (state, action) => {
        state.uiState.deleteExpense.isLoading = false;
        state.uiState.deleteExpense.error = {
          isError: true,
          errorMessage: action.payload || 'Something went wrong',
        };
      });

    builder
      .addCase(updateExpenseStatus.pending, (state) => {
        state.uiState.updateExpenseStatus.isLoading = true;
        state.uiState.updateExpenseStatus.error = { isError: false, errorMessage: '' };
      })
      .addCase(updateExpenseStatus.fulfilled, (state, action) => {
        const updatedExpenses = updateExpenses(state.expenses.data, action.payload);
        state.expenses.data = updatedExpenses;
        state.uiState.updateExpenseStatus.isLoading = false;
      })
      .addCase(updateExpenseStatus.rejected, (state, action) => {
        state.uiState.updateExpenseStatus.isLoading = false;
        state.uiState.updateExpenseStatus.error = {
          isError: true,
          errorMessage: action.payload || 'Something went wrong',
        };
      });
  },
});

const {
  setIsOpenUpdateExpenseDialog,
  setIsOpenCreateExpenseDialog,
  setCreateExpenseIsLoading,
  setCreateExpenseIsDone,
  setCreateExpenseError,
  setUpdateExpenseIsLoading,
  setUpdateExpenseIsDone,
  setDeleteExpenseIsDone,
  setDeleteExpenseIsLoading,
  setIsOpenDeleteExpenseDialog,
} = expenseSlice.actions;

export const ExpenseActions = {
  setIsOpenUpdateExpenseDialog,
  setIsOpenCreateExpenseDialog,
  setCreateExpenseIsLoading,
  setCreateExpenseIsDone,
  setCreateExpenseError,
  setUpdateExpenseIsLoading,
  setUpdateExpenseIsDone,
  setDeleteExpenseIsDone,
  setDeleteExpenseIsLoading,
  setIsOpenDeleteExpenseDialog,
};

export default expenseSlice;
