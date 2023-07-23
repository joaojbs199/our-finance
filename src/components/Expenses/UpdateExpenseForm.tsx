'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '../BlockBackground/BlockBackground';
import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';
import { ExpenseType } from '@prisma/client';
import IntlCurrencyInput from 'react-intl-currency-input';
import { DateHandler } from '@/src/utils/DateHandler';
import { joinClassNames } from '@/src/utils/Helpers';

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
  } = useForm({
    defaultValues: {
      description: '',
      dueDate: '',
      observations: '',
      paymentBarCode: '',
      type: { label: '', value: '' },
      value: '',
    },
  });

  const handleChange = (value: number, maskedValue: string) => {
    console.log(value); // value without mask (ex: 1234.56)
    console.log(maskedValue); // masked value (ex: R$1234,56)
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
            <form className=" m-auto mt-5 flex w-11/12 max-w-lg flex-wrap justify-center  p-3">
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
              <IntlCurrencyInput
                className="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
                currency="BRL"
                defaultValue={expense.value}
                max={999999999.99}
                config={{
                  locale: 'pt-BR',
                  formats: {
                    number: {
                      BRL: {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    },
                  },
                }}
                onChange={handleChange}
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
                render={({ field: { onChange } }) => {
                  return (
                    <Select
                      classNames={{
                        container: () => 'w-full',
                        control: ({ isFocused }) =>
                          joinClassNames(
                            isFocused ? 'border-gray-50' : 'border-neutral-500',
                            'border rounded bg-neutral-700',
                          ),
                        placeholder: () => 'text-gray-100 pl-1 text-[12px] tracking-widest',
                        indicatorSeparator: () => 'border h-7 border-neutral-500 m-auto',
                        dropdownIndicator: ({ isFocused }) =>
                          joinClassNames(
                            isFocused ? 'text-neutral-200' : 'text-neutral-500',
                            'p-1 hover:text-neutral-200',
                          ),
                        clearIndicator: () => 'p-1 text-red-500 hover:text-red-400',
                        menu: () =>
                          'w-full mt-0 bg-neutral-800 border border-neutral-700 text-[12px] rounded-md',
                        option: ({ isSelected }) =>
                          joinClassNames(
                            isSelected ? 'bg-neutral-700' : '',
                            'p-1 text-gray-100 tracking-widest cursor-pointer hover:bg-neutral-700',
                          ),
                        singleValue: () => 'text-[12px] pl-1 text-gray-100 tracking-widest',
                      }}
                      unstyled
                      isClearable
                      isSearchable
                      options={selectOptions}
                      placeholder="Selecione uma opção"
                      defaultValue={
                        expense.type === ExpenseType.INDIVIDUAL
                          ? selectOptions[0]
                          : selectOptions[1]
                      }
                      onChange={onChange}
                    />
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
