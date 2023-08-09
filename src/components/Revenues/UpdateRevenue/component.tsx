'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '@/src/components/BlockBackground/component';
import { BasicModal } from '@/src/components/BasicModal/component';
import { CloseButton } from '@/src/components/Buttons/CloseButton/component';
import { RevenueActions } from '@/src/slices/revenue/revenueSlice';
import { Controller, useForm } from 'react-hook-form';
import { RevenueTypeOptions, UpdateRevenueFormValues } from '@/src/components/Revenues/interfaces';
import { RevenueType } from '@prisma/client';
import { OwnerSelectOptions } from '@/src/integration/data/models/flow/owner/interfaces';
import { DateHandler } from '@/src/utils/DateHandler';
import { convertCurrency, joinClassNames, parseLocaleNumber } from '@/src/utils/Helpers';
import { FormInputWrapper } from '@/src/components/FormInputWrapper/component';
import { TextInput } from '@/src/components/Inputs/TextInput/component';
import { AlertMessage } from '@/src/components/AlertMessage/component';
import { useState } from 'react';
import { SubmitButton } from '@/src/components/Buttons/SubmitButton/component';
import { DateInput } from '@/src/components/Inputs/DateInput/component';
import { CurrencyInput } from '@/src/components/Inputs/CurrencyInput/component';
import { StyledSelect } from '@/src/components/BasicSelect/component';

export const RenderUpdateRevenue = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.revenue.uiState.dialogs.updateRevenueDialog,
  );
  return <>{isOpen && <UpdateRevenue />}</>;
};

const UpdateRevenue = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const formId = 'update_revenue_form';

  const [hasUpdates, setHasUpdates] = useState(true);

  const state = useSelector((state: RootState) => state);

  const { isLoading, isDone, error } = state.revenue.uiState.updateRevenue;

  const { revenueId } = state.revenue.uiState.dialogs.updateRevenueDialog;

  const [revenue] = state.revenue.revenues.data.filter((revenue) => {
    return revenue.id === revenueId;
  });

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

  const revenueType = revenue.type === RevenueType.GENERAL ? typeOptions[0] : typeOptions[1];

  const revenueOwner: OwnerSelectOptions = { label: revenue.owner.name, value: revenue.owner.id };

  const ownerOptions: Array<OwnerSelectOptions> = state.owner.owners.map((owner) => {
    return { label: owner.name, value: owner.id };
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRevenueFormValues>({
    defaultValues: {
      description: revenue.description,
      date: DateHandler.simplifyDateISO(revenue.date),
      value: convertCurrency(revenue.value),
      type: revenueType,
      owner: revenueOwner,
    },
  });

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
        <form
          id={formId}
          onSubmit={handleSubmit(handleFormSubmit)}
          className=" m-auto mt-5 flex w-11/12 max-w-lg flex-wrap justify-center p-3  pb-5"
        >
          <FormInputWrapper classNames="">
            <TextInput
              rules={{ required: 'Informe uma descrição.' }}
              name="description"
              register={register}
              disabled={isLoading || isDone}
              classNames={joinClassNames(
                errors.description ? 'border-red-500 focus:border-red-500' : '',
                'h-9 w-full disabled:text-gray-500 content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50',
              )}
            />
            {errors && errors?.description?.type === 'required' && (
              <AlertMessage messageType="error" message={errors.description.message} />
            )}
          </FormInputWrapper>

          <FormInputWrapper classNames="">
            <DateInput
              rules={{ required: 'Selecione uma data.' }}
              name="date"
              register={register}
              disabled={isLoading || isDone}
              classNames={joinClassNames(
                errors.date ? 'border-red-500 text-red-500 focus:border-red-500' : '',
                'h-9 w-full disabled:text-gray-500 content-center rounded border border-neutral-500 bg-neutral-700 pl-1 pr-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50',
              )}
            />
            {errors && errors?.date?.type === 'required' && (
              <AlertMessage messageType="error" message={errors.date.message} />
            )}
          </FormInputWrapper>

          <Controller
            control={control}
            name="value"
            rules={{
              validate: (value) => {
                const numberValue = parseLocaleNumber(value, 'pt-BR');
                const isValid = typeof numberValue === 'number' && numberValue > 0;
                if (!isValid) return 'Informe um valor.';
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <FormInputWrapper classNames="">
                  <CurrencyInput
                    onChange={onChange}
                    value={value}
                    disabled={isLoading || isDone}
                    classNames={joinClassNames(
                      errors.value ? 'border-red-500 text-red-500 focus:border-red-500' : '',
                      'h-9 w-full disabled:text-gray-500 content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50',
                    )}
                  />
                  {errors && errors?.value?.type === 'validate' && (
                    <AlertMessage messageType="error" message={errors.value.message} />
                  )}
                </FormInputWrapper>
              );
            }}
          />

          <Controller
            control={control}
            name="type"
            rules={{ required: 'Selecione um tipo.' }}
            render={({ field: { onChange, value } }) => {
              return (
                <FormInputWrapper classNames="">
                  <StyledSelect
                    error={errors.type}
                    value={value}
                    onChange={onChange}
                    isDisabled={isLoading || isDone}
                    options={typeOptions}
                  />
                  {errors && errors?.type?.type === 'required' && (
                    <AlertMessage messageType="error" message={errors.type.message} />
                  )}
                </FormInputWrapper>
              );
            }}
          />

          <Controller
            control={control}
            name="owner"
            rules={{ required: 'Selecione um responsável.' }}
            render={({ field: { onChange, value } }) => {
              return (
                <FormInputWrapper classNames="">
                  <StyledSelect
                    error={errors.type}
                    value={value}
                    onChange={onChange}
                    isDisabled={isLoading || isDone}
                    options={ownerOptions}
                  />
                  {errors && errors?.type?.type === 'required' && (
                    <AlertMessage messageType="error" message={errors.type.message} />
                  )}
                </FormInputWrapper>
              );
            }}
          />

          <SubmitButton
            formId={formId}
            isSubmitting={isLoading}
            disabled={isLoading || isDone}
            text="Alterar"
          />

          <div className="w-full pt-2">
            {!hasUpdates && <AlertMessage messageType="warning" message="Nada à alterar" />}
            {isDone && <AlertMessage messageType="success" message="Receita atualizada" />}
            {error.isError && (
              <AlertMessage messageType="error" message="Erro ao atualizar receita" />
            )}
          </div>
        </form>
      </BasicModal>
    </BlockBackground>
  );
};
