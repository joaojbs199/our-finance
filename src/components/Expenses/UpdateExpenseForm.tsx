'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '../BlockBackground/BlockBackground';
import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';
import { ExpenseType } from '@prisma/client';
import { DateHandler } from '@/src/utils/DateHandler';
import { CurrencyInput } from '@/src/components/Inputs/CurrencyInput';
import { StyledSelect } from '../Selects/Select';

interface SelectOption {
  label: string;
  value: string;
}

interface FormValues {
  description: string;
  dueDate: string;
  observations: string;
  paymentBarCode: string;
  type: SelectOption;
  value: string;
}

export const UpdateExpenseForm: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const {
    expense: {
      uiState,
      expenses: { data },
    },
  } = useSelector((state: RootState) => state);

  const [expense] = data.filter((expense) => {
    return expense.id === uiState.dialogs.updateExpenseDialog.expenseId;
  });

  const selectOptions = [
    {
      label: 'Individual',
      value: ExpenseType.INDIVIDUAL,
    },
    {
      label: 'Compartilhada',
      value: ExpenseType.SHARED,
    },
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: '',
      dueDate: '',
      observations: '',
      paymentBarCode: '',
      type: { label: '', value: '' },
      value: '',
    },
  });

  const handleFormSubmit = (data: any) => {
    console.log('DEBUG_OUR-FINANCE <-----> data:', data);
  };

  return (
    <>
      {uiState.dialogs.updateExpenseDialog.isOpen && (
        <BlockBackground>
          <div className="z-30 h-fit w-[95%] max-w-md rounded-md bg-neutral-800">
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
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className=" m-auto mt-5 flex w-11/12 max-w-lg flex-wrap justify-center  p-3"
            >
              <input
                {...register('description', {
                  required: { value: true, message: 'Insira uma descrição' },
                  value: expense.description,
                })}
                type="text"
                className="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
              />
              <input
                {...register('dueDate', {
                  required: { value: true, message: 'Insira uma data' },
                  value: DateHandler.simplifyDateISO(expense.dueDate),
                })}
                type="date"
                className="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 pr-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
              />

              <Controller
                control={control}
                name="value"
                rules={{ required: 'Informe um valor' }}
                render={({ field: { onChange } }) => {
                  return (
                    <>
                      <CurrencyInput
                        onChange={onChange}
                        receivedValue={expense.value}
                        classNames="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
                      />
                      {errors.value && <p>{errors.value.message}</p>}
                    </>
                  );
                }}
              />
              <input
                type="text"
                className="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
                {...register('observations', {
                  value: expense.observations ?? '',
                })}
              />
              <input
                type="text"
                className="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
                {...register('paymentBarCode', {
                  value: expense.paymentBarCode ?? '',
                })}
              />
              <Controller
                control={control}
                name="type"
                rules={{ required: 'Selecione um tipo' }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <>
                      <StyledSelect
                        initialValue={
                          expense.type === ExpenseType.INDIVIDUAL
                            ? selectOptions[0]
                            : selectOptions[1]
                        }
                        value={value}
                        onChange={onChange}
                        options={selectOptions}
                      />
                      {errors.type && <p>{errors.type.message}</p>}
                    </>
                  );
                }}
              />
              <button
                className="duration-250 mb-5 mt-8 flex h-9 w-full max-w-[200px] items-center justify-center rounded-md border border-neutral-700 text-gray-100 transition-all hover:bg-orange-500 hover:text-neutral-800"
                type="submit"
              >
                Atualizar
              </button>
            </form>
          </div>
        </BlockBackground>
      )}
    </>
  );
};
