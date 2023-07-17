'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, useAppDispatch } from '@/src/store/store';
import { DateHandler } from '@/src/utils/DateHandler';

const GetExpensesButton = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const initialDate = DateHandler.formatDateISO('01/07/2023');
  const finalDate = DateHandler.formatDateISO('31/07/2023');

  return (
    <button
      className="rounded border border-gray-200 p-1"
      onClick={() => {
        dispatch(
          getExpenses({
            initialDate: new Date(initialDate),
            finalDate: new Date(finalDate),
          }),
        );
      }}
    >
      Get Expenses
    </button>
  );
};

export default GetExpensesButton;
