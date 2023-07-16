import { Owner } from '@prisma/client';
import { IExpenseApiResponse } from '@/src/integration/data/models/apiResponse/expense/interfaces';

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
  owners: Owner[];
}

export interface IExpenseState {
  uiState: {
    getExpenses: IUiState;
  };
  expenses: IExpenseApiResponse;
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
