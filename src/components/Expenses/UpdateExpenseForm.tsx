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
          <div className="z-30 h-3/5 w-[95%] max-w-md rounded-md bg-neutral-800">
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
            <form>
              <input
                {...register('description', {
                  required: { value: true, message: 'Insira uma descrição' },
                  value: expense.description,
                })}
                type="text"
              />
              <input
                {...register('dueDate', {
                  required: { value: true, message: 'Insira uma data' },
                  value: DateHandler.simplifyDateISO(expense.dueDate),
                })}
                type="date"
              />
              <IntlCurrencyInput
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
                {...register('observations', {
                  value: expense.observations ?? '',
                })}
              />
              <input
                type="text"
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
              <button type="submit">Atualizar</button>
            </form>
          </div>
        </BlockBackground>
      )}
    </>
  );
};
