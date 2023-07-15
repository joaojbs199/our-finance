import { Owner } from '@prisma/client';

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
