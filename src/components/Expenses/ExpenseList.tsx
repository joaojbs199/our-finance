'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ItemList } from '../List/ItemList';
import { ExpenseCard } from '@/src/components/Expenses/ExpenseCard';
import { Loader } from '@/src/components/Loader/Loader';

export const ExpenseList = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state);
  const { configuration } = state;
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
    <>
      {configuration.globalLoading && <Loader />}
      <ItemList>
        {data.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </ItemList>
    </>
  );
};
