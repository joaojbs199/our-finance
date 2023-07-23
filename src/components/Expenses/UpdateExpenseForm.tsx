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
      {uiState.dialogs.updateExpenseDialog.isOpen && (
        <BlockBackground>
          <div className="z-30 h-3/5 w-[95%] bg-red-500">
            <X
              onClick={() => {
                dispatch(
                  ExpenseActions.setIsOpenUpdateExpenseDialog({ isOpen: false, expenseId: 0 }),
                );
              }}
            />
          </div>
        </BlockBackground>
      )}
    </>
  );
};
