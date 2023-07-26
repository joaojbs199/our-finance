'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '@/src/components/BlockBackground/BlockBackground';
import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';
import { ExpenseType } from '@prisma/client';
import { DateHandler } from '@/src/utils/DateHandler';
import { CurrencyInput } from '@/src/components/Inputs/CurrencyInput';
import { StyledSelect } from '@/src/components/Selects/Select';
import { convertCurrency, parseLocaleNumber } from '@/src/utils/Helpers';
import { TextInput } from '@/src/components/Inputs/SimpleInput';
import { DateInput } from '@/src/components/Inputs/DateInput';

export const RenderUpdateExpenseForm = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.expense.uiState.dialogs.updateExpenseDialog,
  );
  return <>{isOpen && <UpdateExpenseForm />}</>;
};

type SelectOption = {
  label: string;
  value: string;
};

interface FormValues {
  description: string;
  dueDate: string;
  observations: string | null;
  paymentBarCode: string | null;
  type: SelectOption;
  value: string;
}

const UpdateExpenseForm: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const { expenseId } = useSelector(
    (state: RootState) => state.expense.uiState.dialogs.updateExpenseDialog,
  );
  const [expense] = useSelector((state: RootState) =>
    state.expense.expenses.data.filter((expense) => expense.id === expenseId),
  );

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
    formState: { errors, defaultValues },
  } = useForm<FormValues>({
    defaultValues: {
      description: expense.description,
      dueDate: DateHandler.simplifyDateISO(expense.dueDate),
      observations: expense.observations,
      paymentBarCode: expense.paymentBarCode,
      type: expense.type === ExpenseType.INDIVIDUAL ? selectOptions[0] : selectOptions[1],
      value: convertCurrency(expense.value),
    },
  });

  const handleFormSubmit = (data: any) => {
    console.log('DEBUG_OUR-FINANCE <-----> data:', JSON.stringify(data, null, 2));
  };

  return (
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
          <TextInput
            name="description"
            register={register}
            classNames="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />
          <DateInput
            name="dueDate"
            register={register}
            classNames="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 pr-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />
          <CurrencyInput
            name="value"
            value={defaultValues?.value as string}
            register={register}
            rules={{
              validate: (value) => {
                const numberValue = parseLocaleNumber(value, 'pt-BR');
                const isValid = typeof numberValue === 'number' && numberValue > 0;
                if (!isValid) return 'Informe um valor.';
              },
            }}
            classNames="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />

          <TextInput
            name="observations"
            register={register}
            classNames="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />

          <TextInput
            name="paymentBarCode"
            register={register}
            classNames="mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50"
          />

          <Controller
            control={control}
            name="type"
            rules={{ required: 'Selecione um tipo.' }}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <StyledSelect value={value} onChange={onChange} options={selectOptions} />
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
  );
};
