'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '../BlockBackground/BlockBackground';
import { X } from 'lucide-react';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';

export const UpdateExpenseForm = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const {
    expense: { uiState },
  } = useSelector((state: RootState) => state);

  return (
    <>
      {uiState.dialogs.isOpenUpdateExpenseDialog && (
        <BlockBackground>
          <div className="z-30 h-3/5 w-[95%] bg-red-500">
            <X
              onClick={() => {
                dispatch(ExpenseActions.setIsOpenUpdateExpenseDialog(false));
              }}
            />
          </div>
        </BlockBackground>
      )}
    </>
  );
};
