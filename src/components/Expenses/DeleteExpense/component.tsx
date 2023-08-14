'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BasicModal } from '@/src/components/BasicModal/component';
import { BlockBackground } from '@/src/components/BlockBackground/component';
import { CloseButton } from '@/src/components/Buttons/CloseButton/component';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '@/src/components/Buttons/SubmitButton/component';
import { AlertMessage } from '@/src/components/AlertMessage/component';
import { deleteExpense } from '@/src/store/modules/expense/asyncThunks';

export const RenderDeleteExpense = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.expense.uiState.dialogs.deleteExpenseDialog,
  );
  return <>{isOpen && <DeleteExpense />}</>;
};

const DeleteExpense = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const formId = 'delete_expense_form';

  const state = useSelector((state: RootState) => state);

  const { expenseId } = state.expense.uiState.dialogs.deleteExpenseDialog;

  const { isLoading, isDone, error } = state.expense.uiState.deleteExpense;

  const { handleSubmit } = useForm();

  const handleFormSubmit = () => {
    dispatch(deleteExpense({ id: expenseId }));
  };

  return (
    <BlockBackground>
      <BasicModal
        closeButton={
          <CloseButton
            isDisabled={isLoading}
            closeAction={() =>
              dispatch(ExpenseActions.setIsOpenDeleteExpenseDialog({ isOpen: false, expenseId: 0 }))
            }
          />
        }
      >
        <form
          className=" m-auto flex w-52 max-w-lg flex-wrap justify-center p-3  pb-5"
          onSubmit={handleSubmit(handleFormSubmit)}
          id={formId}
        >
          <p className="text-center text-gray-100">
            Tem certeza de que deseja excluir essa despesa?
          </p>
          <SubmitButton
            formId={formId}
            isSubmitting={isLoading}
            disabled={isLoading || isDone}
            text="Excluir"
          />

          <div className="w-full pt-2">
            {isDone && <AlertMessage messageType="success" message="Despesa excluída" />}
            {error.isError && (
              <AlertMessage messageType="error" message="Erro ao excluir despesa" />
            )}
          </div>
        </form>
      </BasicModal>
    </BlockBackground>
  );
};
