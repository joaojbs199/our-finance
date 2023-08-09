'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '@/src/components/BlockBackground/component';
import { BasicModal } from '@/src/components/BasicModal/component';
import { CloseButton } from '@/src/components/Buttons/CloseButton/component';
import { RevenueActions } from '@/src/slices/revenue/revenueSlice';
import { useForm } from 'react-hook-form';
import { TypeOptions } from './interfaces';
import { RevenueType } from '@prisma/client';

export const RenderUpdateRevenue = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.revenue.uiState.dialogs.updateRevenueDialog,
  );
  return <>{isOpen && <UpdateRevenue />}</>;
};

const UpdateRevenue = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const formId = 'update_revenue_form';

  const state = useSelector((state: RootState) => state);

  const { isLoading, isDone, error } = state.revenue.uiState.updateRevenue;

  const { revenueId } = state.revenue.uiState.dialogs.updateRevenueDialog;

  const [revenue] = state.revenue.revenues.data.filter((revenue) => revenue.id === revenueId);

  const typeOptions: TypeOptions[] = [
    {
      label: 'Geral',
      value: RevenueType.GENERAL,
    },
    {
      label: 'Alimentação',
      value: RevenueType.FOOD,
    },
  ];

  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (formData: any) => {
    console.log('DEBUG_OUR-FINANCE <-----> formData:', formData);
  };

  return (
    <BlockBackground>
      <BasicModal
        closeButton={
          <CloseButton
            isDisabled={isLoading || isDone}
            closeAction={() =>
              dispatch(RevenueActions.setIsOpenUpdateRevenueDialog({ isOpen: false, revenueId: 0 }))
            }
          />
        }
      >
        <div className="h-[400px]"></div>
      </BasicModal>
    </BlockBackground>
  );
};
