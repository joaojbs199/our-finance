'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ItemList } from '../../BasicList/component';
import { ExpenseCard } from '@/src/components/Expenses/ExpenseCard/component';

export const ExpenseList = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state);
  const { metadata, data } = state.expense.expenses;

  useEffect(() => {
    dispatch(
      getExpenses({
        initialDate: '',
        finalDate: '',
      }),
    );
  }, []);

  return (
    <ItemList>
      {data.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </ItemList>
  );
};
