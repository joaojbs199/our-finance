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
      updateExpenseDialog: {
        isOpen: false,
        expenseId: 0,
      },
    },
    getExpenses: initialUiState,
    createExpense: initialUiState,
    updateExpenseStatus: initialUiState,
    updateExpense: initialUiState,
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
