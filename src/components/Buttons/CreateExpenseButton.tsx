'use client';

import { createExpense } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, useAppDispatch } from '@/src/store/store';
import { DateHandler } from '@/src/utils/DateHandler';

const CreateExpenseButton = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const dueDate = DateHandler.formatDateISO('24/07/2023');

  return (
    <button
      className="rounded border border-gray-200 p-1"
      onClick={() => {
        dispatch(
          createExpense({
            expense: {
              dueDate: new Date(dueDate),
              value: 159.3,
              description: 'Conta teste',
              type: 'INDIVIDUAL',
              status: false,
            },
            ownerId: 1,
          }),
        );
      }}
    >
      Create Expense
    </button>
  );
};

export default CreateExpenseButton;
