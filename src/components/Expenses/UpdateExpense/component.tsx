'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '@/src/components/BlockBackground/component';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';
import { ExpenseType } from '@prisma/client';
import { DateHandler } from '@/src/utils/DateHandler';
import { convertCurrency, parseLocaleNumber } from '@/src/utils/Helpers';
import { FormValues, OwnerOptions, TypeOptions } from './interfaces';
import { Controller, useForm } from 'react-hook-form';
import { BasicModal } from '@/src/components/BasicModal/component';
import { CloseButton } from '@/src/components/Buttons/CloseButton/component';
import { IUpdateExpenseRequestParams } from '@/src/integration/data/models/requestParams/expense/interfaces';
import { TextInput } from '@/src/components/Inputs/TextInput/component';
import { DateInput } from '@/src/components/Inputs/DateInput/component';
import { CurrencyInput } from '@/src/components/Inputs/CurrencyInput/component';
import { StyledSelect } from '@/src/components/BasicSelect/component';
import { useState } from 'react';
import { updateExpense } from '@/src/store/modules/expense/asyncThunks';
import isEmpty from 'is-empty';
import { Loader2 } from 'lucide-react';

export const RenderUpdateExpense = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.expense.uiState.dialogs.updateExpenseDialog,
  );
  return <>{isOpen && <UpdateExpense />}</>;
};

const UpdateExpense: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const [hasUpdates, setHasUpdates] = useState(true);

  const state = useSelector((state: RootState) => state);

  const { isLoading, isDone, error } = state.expense.uiState.updateExpense;

  const { expenseId } = state.expense.uiState.dialogs.updateExpenseDialog;

  const [expense] = state.expense.expenses.data.filter((expense) => expense.id === expenseId);

  const typeOptions: TypeOptions[] = [
    {
      label: 'Individual',
      value: ExpenseType.INDIVIDUAL,
    },
    {
      label: 'Compartilhada',
      value: ExpenseType.SHARED,
    },
  ];

  const expenseType = expense.type === ExpenseType.INDIVIDUAL ? typeOptions[0] : typeOptions[1];

  const expenseOwner: Array<OwnerOptions> = expense.owners.map((owner) => {
    return { label: owner.name, value: owner.id };
  });

  const ownerOptions: Array<OwnerOptions> = state.owner.owners.map((owner) => {
    return { label: owner.name, value: owner.id };
  });

  const [isMulti, setIsMulti] = useState(expenseType.value === ExpenseType.SHARED);
  const [ownersDisabled, setOwnersDisabled] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: expense.description,
      dueDate: DateHandler.simplifyDateISO(expense.dueDate),
      value: convertCurrency(expense.value),
      observations: expense.observations,
      paymentBarCode: expense.paymentBarCode,
      type: expenseType,
      owners: expenseOwner,
    },
  });

  const handleFormSubmit = (formData: FormValues) => {
    const newDueDate = DateHandler.createCompleteDateISO(formData.dueDate);
    const newValue = parseLocaleNumber(formData.value, 'pt-BR');

    const updateExpenseParams: IUpdateExpenseRequestParams = {
      id: expense.id,
      updates: {
        ...(formData.description !== expense.description && { description: formData.description }),
        ...(newDueDate !== String(expense.dueDate) && {
          dueDate: newDueDate,
        }),
        ...(formData.observations !== expense.observations && {
          observations: formData.observations,
        }),
        ...(formData.paymentBarCode !== expense.paymentBarCode && {
          paymentBarCode: formData.paymentBarCode,
        }),
        ...(formData.type.value !== expense.type && {
          type: formData.type.value,
        }),
        ...(newValue !== expense.value && {
          value: newValue,
        }),
        ...(JSON.stringify(formData.owners) !== JSON.stringify(expenseOwner) && {
          owners: formData.owners.map((owner) => {
            return { id: owner.value };
          }),
        }),
      },
    };

    if (isEmpty(updateExpenseParams.updates)) {
      setTimeout(() => {
        setHasUpdates(true);
      }, 1000);
      setHasUpdates(false);
    } else {
      dispatch(updateExpense(updateExpenseParams));
    }
  };

  return (
    <BlockBackground>
      <BasicModal
        closeButton={
          <CloseButton
            isDisabled={isLoading || isDone}
            closeAction={() =>
              dispatch(ExpenseActions.setIsOpenUpdateExpenseDialog({ isOpen: false, expenseId: 0 }))
            }
          />
        }
      >
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className=" m-auto mt-5 flex w-11/12 max-w-lg flex-wrap justify-center p-3  pb-5"
        >
          <TextInput
            rules={{ required: 'Informe uma descrição.' }}
            error={errors.description}
            name="description"
            register={register}
            disabled={isLoading || isDone}
            classNames="mb-2 h-9 w-full disabled:text-gray-500 content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />

          <DateInput
            rules={{ required: 'Selecione uma data.' }}
            name="dueDate"
            register={register}
            error={errors.dueDate}
            disabled={isLoading || isDone}
            classNames="mb-2 h-9 w-full disabled:text-gray-500 content-center rounded border border-neutral-500 bg-neutral-700 pl-1 pr-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />

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
                <>
                  <CurrencyInput
                    onChange={onChange}
                    value={value}
                    error={errors.value}
                    disabled={isLoading || isDone}
                    classNames="mb-2 h-9 w-full disabled:text-gray-500 content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
                  />
                </>
              );
            }}
          />

          <TextInput
            error={errors.observations}
            name="observations"
            register={register}
            disabled={isLoading || isDone}
            classNames="mb-2 h-9 w-full disabled:text-gray-500 content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />

          <TextInput
            error={errors.paymentBarCode}
            name="paymentBarCode"
            register={register}
            disabled={isLoading || isDone}
            classNames="mb-2 h-9 w-full disabled:text-gray-500 content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />

          <Controller
            control={control}
            name="type"
            rules={{ required: 'Selecione um tipo.' }}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <StyledSelect
                    error={errors.type}
                    value={value}
                    onChange={(option) => {
                      setValue('owners', []);
                      onChange(option);
                      option ? setOwnersDisabled(false) : setOwnersDisabled(true);
                      const isValid = option && option.value === ExpenseType.SHARED;
                      setIsMulti(!!isValid);
                      clearErrors('owners');
                    }}
                    isDisabled={isLoading || isDone}
                    options={typeOptions}
                  />
                </>
              );
            }}
          />

          <Controller
            control={control}
            name="owners"
            rules={{
              required: 'Selecione um responsável.',
              validate: (value) => {
                const isValid =
                  !isMulti && value.length === 1
                    ? true
                    : isMulti && value.length > 1
                    ? true
                    : false;
                if (!isValid) return 'Despesa deve ter mais de um responsável.';
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <StyledSelect
                    error={errors.owners}
                    value={value}
                    isDisabled={ownersDisabled || isLoading || isDone}
                    isMulti={isMulti}
                    onChange={(value) => {
                      const selectValue =
                        value && Array.isArray(value) ? value : !value ? value : [value];
                      onChange(selectValue);
                    }}
                    options={ownerOptions}
                    placeholder={isMulti ? 'Selecione as opções' : 'Seleciona uma opção'}
                  />
                </>
              );
            }}
          />

          <button
            className="duration-250 mt-5 flex h-9 w-full max-w-[200px] items-center justify-center rounded-md border border-neutral-700 bg-orange-500 text-gray-100 transition-all hover:bg-orange-400 hover:text-gray-50 disabled:bg-orange-400"
            type="submit"
            disabled={isLoading || isDone}
          >
            {isLoading ? (
              <Loader2 className="font-extrabold5 h-5 w-5 animate-spin text-gray-100" />
            ) : (
              'Alterar'
            )}
          </button>
          {!hasUpdates && (
            <p className="mb-2 mt-2 w-full text-center font-poppins text-xs font-normal tracking-widest text-orange-500">
              Nada à atualizar
            </p>
          )}

          {isDone && (
            <p className="mb-2 mt-2 w-full text-center font-poppins text-xs font-normal tracking-widest text-green-500">
              Despesa atualizada
            </p>
          )}
        </form>
      </BasicModal>
    </BlockBackground>
  );
};
