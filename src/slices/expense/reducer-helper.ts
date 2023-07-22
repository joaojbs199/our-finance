import { PartialExpense } from '@/src/integration/data/models/apiResponse/expense/interfaces';

/**
 * Replaces the old expense with the new one that was returned.
 * @param updatedExpense Returned expense from update query.
 * @param expenses Current expenses list in state.
 * @returns Updated expense list.
 */
export const updateExpenses = (updatedExpense: PartialExpense, expenses: PartialExpense[]) => {
  const updatedExpenses: PartialExpense[] = expenses.map((expense) => {
    return expense.id === updatedExpense.id ? { ...updatedExpense } : expense;
  });

  return updatedExpenses;
};
