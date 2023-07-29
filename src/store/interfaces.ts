import { IGetExpenseApiResponse } from '@/src/integration/data/models/apiResponse/expense/interfaces';
import { PartialOwner } from '@/src/integration/data/models/apiResponse/owner/interfaces';

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
      updateExpenseDialog: {
        isOpen: boolean;
        expenseId: number;
      };
    };
    getExpenses: IUiState;
    createExpense: IUiState;
    updateExpenseStatus: IUiState;
  };
  expenses: IGetExpenseApiResponse;
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
