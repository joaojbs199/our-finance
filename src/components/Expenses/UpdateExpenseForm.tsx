'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '../BlockBackground/BlockBackground';
import { X } from 'lucide-react';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';

export const UpdateExpenseForm = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const {
    expense: {
      uiState,
      expenses: { data },
    },
  } = useSelector((state: RootState) => state);

  return (
    <>
      {!uiState.dialogs.updateExpenseDialog.isOpen && (
        <BlockBackground>
          <div className="z-30 h-3/5 w-[95%] max-w-md rounded-md bg-neutral-800">
            <header className="flex w-full justify-end border-b border-neutral-700 p-1 sm:p-2">
              <X
                className="h-4 w-4 rounded-full border border-neutral-600 p-0.5 text-gray-50 hover:cursor-pointer hover:border-gray-500 hover:text-neutral-400 sm:h-5 sm:w-5"
                onClick={() => {
                  dispatch(
                    ExpenseActions.setIsOpenUpdateExpenseDialog({ isOpen: false, expenseId: 0 }),
                  );
                }}
              />
            </header>
          </div>
        </BlockBackground>
      )}
    </>
  );
};
