'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '@/src/components/Loader/Loader';

export const ItemList = () => {
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
    <>
      {uiState.getExpenses.isLoading && <Loader />}

      <div className="m-1 flex-grow bg-gray-200 "></div>
    </>
  );
};
