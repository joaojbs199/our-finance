'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ItemList } from '../List/ItemList';

export const ExpenseList = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state);
  const { metadata, data } = state.expense.expenses;
  const { uiState } = state.expense;

  useEffect(() => {
    dispatch(
      getExpenses({
        initialDate: '',
        finalDate: '',
      }),
    );
  }, []);

  return (
    <ItemList isLoading={uiState.getExpenses.isLoading}>
      {data.map((expense) => (
        <div className="my-2 h-32 rounded-md border border-gray-900" key={expense.id}>
          {expense.description}
        </div>
      ))}
    </ItemList>
  );
};
