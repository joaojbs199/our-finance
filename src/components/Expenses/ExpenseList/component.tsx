'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ItemList } from '../../BasicList/component';
import { ExpenseCard } from '@/src/components/Expenses/ExpenseCard/component';
import { getOwners } from '@/src/store/modules/owner/asyncThunks';

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
    dispatch(getOwners());
  }, []);

  return (
    <ItemList>
      {data.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </ItemList>
  );
};
