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
      createExpenseDialog: {
        isOpen: false,
      },
      deleteExpenseDialog: {
        isOpen: false,
        expenseId: 0,
      },
    },
    getExpenses: initialUiState,
    createExpense: initialUiState,
    updateExpense: initialUiState,
    deleteExpense: initialUiState,
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
