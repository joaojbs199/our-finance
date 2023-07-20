'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ItemList } from '../List/ItemList';
import { ExpenseCard } from '../Cards/Card';

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
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </ItemList>
  );
};
