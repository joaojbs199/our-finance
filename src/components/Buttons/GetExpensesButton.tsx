'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, useAppDispatch } from '@/src/store/store';

const GetExpensesButton = () => {
  const dispatch: AppDispatch = useAppDispatch();

  return (
    <button
      className="rounded border border-gray-200 p-1"
      onClick={() => {
        dispatch(
          getExpenses({
            initialDate: '2023-07-01',
            finalDate: '2023-07-31',
          }),
        );
      }}
    >
      Get Expenses
    </button>
  );
};

export default GetExpensesButton;
