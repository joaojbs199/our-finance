'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { BlockBackground } from '@/src/components/BlockBackground/component';
import { BasicModal } from '@/src/components/BasicModal/component';
import { CloseButton } from '@/src/components/Buttons/CloseButton/component';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RevenueType } from '@prisma/client';
import { RevenueActions } from '@/src/slices/revenue/revenueSlice';
import { RevenueTypeOptions } from '../interfaces';
import { OwnerSelectOptions } from '@/src/integration/data/models/flow/owner/interfaces';

export const RenderCreateRevenue = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.revenue.uiState.dialogs.createRevenueDialog,
  );
  return <>{isOpen && <CreateRevenue />}</>;
};

const CreateRevenue = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const formId = 'create_revenue_form';

  const state = useSelector((state: RootState) => state);

  const { isLoading, isDone, error } = state.revenue.uiState.createRevenue;

  const typeOptions: RevenueTypeOptions[] = [
    {
      label: 'Geral',
      value: RevenueType.GENERAL,
    },
    {
      label: 'Alimentação',
      value: RevenueType.FOOD,
    },
  ];

  const ownerOptions: Array<OwnerSelectOptions> = state.owner.owners.map((owner) => {
    return { label: owner.name, value: owner.id };
  });

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
            closeAction={() => {
              dispatch(RevenueActions.setIsOpenCreateRevenueDialog(false));
              dispatch(RevenueActions.setCreateRevenueError({ isError: false, errorMessage: '' }));
            }}
          />
        }
      >
        <div className="h-[400px]"></div>
      </BasicModal>
    </BlockBackground>
  );
};
