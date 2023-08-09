'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BasicModal } from '@/src/components/BasicModal/component';
import { BlockBackground } from '@/src/components/BlockBackground/component';
import { CloseButton } from '@/src/components/Buttons/CloseButton/component';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '@/src/components/Buttons/SubmitButton/component';
import { AlertMessage } from '@/src/components/AlertMessage/component';
import { RevenueActions } from '@/src/slices/revenue/revenueSlice';

export const RenderDeleteRevenue = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.revenue.uiState.dialogs.deleteRevenueDialog,
  );
  return <>{isOpen && <DeleteRevenue />}</>;
};

const DeleteRevenue = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const formId = 'delete_revenue_form';

  const state = useSelector((state: RootState) => state);

  const { revenueId } = state.revenue.uiState.dialogs.deleteRevenueDialog;

  const { isLoading, isDone, error } = state.revenue.uiState.deleteRevenue;

  const { handleSubmit } = useForm();

  const handleFormSubmit = () => {
    console.log('DEBUG_OUR-FINANCE <-----> revenueId:', revenueId);
  };

  return (
    <BlockBackground>
      <BasicModal
        closeButton={
          <CloseButton
            isDisabled={isLoading}
            closeAction={() =>
              dispatch(RevenueActions.setIsOpenDeleteRevenueDialog({ isOpen: false, revenueId: 0 }))
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
            Tem certeza de que deseja excluir essa receita?
          </p>
          <SubmitButton
            formId={formId}
            isSubmitting={isLoading}
            disabled={isLoading || isDone}
            text="Excluir"
          />

          <div className="w-full pt-2">
            {isDone && <AlertMessage messageType="success" message="Receita excluída" />}
            {error.isError && (
              <AlertMessage messageType="error" message="Erro ao excluir receita" />
            )}
          </div>
        </form>
      </BasicModal>
    </BlockBackground>
  );
};
