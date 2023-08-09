import { IGetExpenseApiResponse } from '@/src/integration/data/models/apiResponse/expense/interfaces';
import { PartialOwner } from '@/src/integration/data/models/apiResponse/owner/interfaces';
import { IGetRevenueApiResponse } from '@/src/integration/data/models/apiResponse/revenues/interfaces';
import { IOpenExpenseDialogs } from '@/src/integration/data/models/flow/expense/interfaces';
import { IOpenRevenueDialogs } from '@/src/integration/data/models/flow/revenue/interfaces';

// COMMON INTERFACES
export interface IUiState {
  isDone: boolean;
  isLoading: boolean;
  error: IErrorState;
}

export interface IErrorState {
  isError: boolean;
  errorMessage: string;
}

// ENTITIES INTERFACES

export interface IOwnerState {
  uiState: {
    getOwners: IUiState;
  };
  owners: PartialOwner[];
}

export interface IExpenseState {
  uiState: {
    dialogs: {
      updateExpenseDialog: IOpenExpenseDialogs;
      createExpenseDialog: {
        isOpen: boolean;
      };
      deleteExpenseDialog: IOpenExpenseDialogs;
    };
    getExpenses: IUiState;
    createExpense: IUiState;
    updateExpense: IUiState;
    deleteExpense: IUiState;
    updateExpenseStatus: IUiState;
  };
  expenses: IGetExpenseApiResponse;
}

export interface IRevenueState {
  uiState: {
    dialogs: {
      updateRevenueDialog: IOpenRevenueDialogs;
      createRevenueDialog: {
        isOpen: boolean;
      };
      deleteRevenueDialog: IOpenRevenueDialogs;
    };
    getRevenues: IUiState;
    createRevenue: IUiState;
    updateRevenue: IUiState;
    deleteRevenue: IUiState;
  };
  revenues: IGetRevenueApiResponse;
}

export interface IConfigurationState {
  globalLoading: boolean;
}

/* ********************************************************************************* */

// COOMMON INITIAL STATES

export const initialUiState: IUiState = {
  isDone: false,
  isLoading: false,
  error: {
    isError: false,
    errorMessage: '',
  },
};
