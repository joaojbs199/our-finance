import { PartialExpense } from '@/src/integration/data/models/apiResponse/expense/interfaces';
import { IOpenExpenseDialogs } from '@/src/integration/data/models/flow/expense/interfaces';
import { IErrorState, IExpenseState } from '@/src/store/interfaces';
import { Draft, PayloadAction } from '@reduxjs/toolkit';

type S = Draft<IExpenseState>;
type A<T> = PayloadAction<T>;

/**
 * Replaces the old expense with the new one that was returned.
 * @param expenses Current expenses list in state.
 * @param updatedExpense Returned expense from update query.
 * @returns Updated expense list.
 */
export const updateExpenses = (expenses: PartialExpense[], updatedExpense: PartialExpense) => {
  const updatedExpenses: PartialExpense[] = expenses.map((expense) => {
    return expense.id === updatedExpense.id ? { ...updatedExpense } : expense;
  });

  return updatedExpenses;
};

export const updateIsOpenUpdateExpenseDialog = (state: S, action: A<IOpenExpenseDialogs>) => {
  const { isOpen, expenseId } = action.payload;
  return {
    ...state,
    uiState: {
      ...state.uiState,
      dialogs: {
        ...state.uiState.dialogs,
        updateExpenseDialog: {
          ...state.uiState.dialogs.updateExpenseDialog,
          isOpen,
          expenseId,
        },
      },
    },
  };
};

export const updateIsOpenDeleteExpenseDialog = (state: S, action: A<IOpenExpenseDialogs>) => {
  const { isOpen, expenseId } = action.payload;
  return {
    ...state,
    uiState: {
      ...state.uiState,
      dialogs: {
        ...state.uiState.dialogs,
        deleteExpenseDialog: {
          ...state.uiState.dialogs.deleteExpenseDialog,
          isOpen,
          expenseId,
        },
      },
    },
  };
};

export const updateIsOpenCreateExpenseDialog = (state: S, action: A<boolean>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      dialogs: {
        ...state.uiState.dialogs,
        createExpenseDialog: {
          ...state.uiState.dialogs.createExpenseDialog,
          isOpen: action.payload,
        },
      },
    },
  };
};

export const updateCreateExpenseIsLoading = (state: S, action: A<boolean>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      createExpense: {
        ...state.uiState.createExpense,
        isLoading: action.payload,
      },
    },
  };
};

export const updateCreateExpenseIsDone = (state: S, action: A<boolean>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      createExpense: {
        ...state.uiState.createExpense,
        isDone: action.payload,
      },
    },
  };
};

export const updateUpdateExpenseIsLoading = (state: S, action: A<boolean>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      updateExpense: {
        ...state.uiState.updateExpense,
        isLoading: action.payload,
      },
    },
  };
};

export const updateDeleteExpenseIsLoading = (state: S, action: A<boolean>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      deleteExpense: {
        ...state.uiState.deleteExpense,
        isLoading: action.payload,
      },
    },
  };
};

export const updateUpdateExpenseIsDone = (state: S, action: A<boolean>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      updateExpense: {
        ...state.uiState.updateExpense,
        isDone: action.payload,
      },
    },
  };
};

export const updateDeleteExpenseIsDone = (state: S, action: A<boolean>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      deleteExpense: {
        ...state.uiState.deleteExpense,
        isDone: action.payload,
      },
    },
  };
};

export const updateDeleteExpenseError = (state: S, action: A<IErrorState>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      deleteExpense: {
        ...state.uiState.deleteExpense,
        error: action.payload,
      },
    },
  };
};

export const updateCreateExpenseError = (state: S, action: A<IErrorState>) => {
  return {
    ...state,
    uiState: {
      ...state.uiState,
      createExpense: {
        ...state.uiState.createExpense,
        error: action.payload,
      },
    },
  };
};
