import {
  IConfigurationState,
  IExpenseState,
  IOwnerState,
  IRevenueState,
  initialUiState,
} from './interfaces';

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

export const initialRevenueState: IRevenueState = {
  uiState: {
    dialogs: {
      updateRevenueDialog: {
        isOpen: false,
        revenueId: 0,
      },
      createRevenueDialog: {
        isOpen: false,
      },
      deleteRevenueDialog: {
        isOpen: false,
        revenueId: 0,
      },
    },
    getRevenues: initialUiState,
    createRevenue: initialUiState,
    updateRevenue: initialUiState,
    deleteRevenue: initialUiState,
  },
  revenues: {
    metadata: {
      totalResults: 0,
    },
    data: [],
  },
};

export const initialConfigurationState: IConfigurationState = {
  globalLoading: false,
};
