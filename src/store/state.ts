import { IConfigurationState, IExpenseState, IOwnerState, initialUiState } from './interfaces';

export const initialOwnerState: IOwnerState = {
  uiState: {
    getOwners: initialUiState,
  },
  owners: [],
};

export const initialExpenseState: IExpenseState = {
  uiState: {
    dialogs: {
      isOpenUpdateExpenseDialog: false,
    },
    getExpenses: initialUiState,
    createExpense: initialUiState,
    updateExpenseStatus: initialUiState,
  },
  expenses: {
    metadata: {
      totalResults: 0,
    },
    data: [],
  },
};

export const initialConfigurationState: IConfigurationState = {
  globalLoading: false,
};
