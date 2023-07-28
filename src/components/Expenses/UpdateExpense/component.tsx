'use client';

import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useSelector } from 'react-redux';
import { BlockBackground } from '@/src/components/BlockBackground/component';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';
import { ExpenseType } from '@prisma/client';
import { DateHandler } from '@/src/utils/DateHandler';
import { convertCurrency, parseLocaleNumber } from '@/src/utils/Helpers';
import { IFormInputProps } from '@/src/components/BasicForm/interfaces';
import { Form } from '@/src/components/BasicForm/component';
import { FormValues } from './interfaces';
import { DefaultValues } from 'react-hook-form';
import { BasicModal } from '@/src/components/BasicModal/component';
import { CloseButton } from '@/src/components/Buttons/CloseButton/component';

export const RenderUpdateExpense = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.expense.uiState.dialogs.updateExpenseDialog,
  );
  return <>{isOpen && <UpdateExpense />}</>;
};

const UpdateExpense: React.FC = () => {
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

  const inputs: Array<IFormInputProps<FormValues>> = [
    {
      id: 1,
      name: 'description',
      control: 'UNCONTROLLED',
      type: 'text',
      defaultValue: expense.description as DefaultValues<FormValues>,
      rules: { required: 'Informe uma descrição.' },
      classNames:
        'mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50',
      error: { type: 'required', message: 'Informe uma descrição.' },
    },
    {
      id: 2,
      name: 'dueDate',
      control: 'UNCONTROLLED',
      type: 'date',
      defaultValue: DateHandler.simplifyDateISO(expense.dueDate) as DefaultValues<FormValues>,
      rules: { required: 'Selecione uma data.' },
      classNames:
        'mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 pr-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50',
      error: { type: 'required', message: 'Selecione uma data.' },
    },
    {
      id: 3,
      name: 'value',
      control: 'CONTROLLED',
      type: 'currency',
      defaultValue: convertCurrency(expense.value) as DefaultValues<FormValues>,
      rules: {
        validate: (value) => {
          const numberValue = parseLocaleNumber(value, 'pt-BR');
          const isValid = typeof numberValue === 'number' && numberValue > 0;
          if (!isValid) return 'Informe um valor.';
        },
      },
      classNames:
        'mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50',
      error: { type: 'validate', message: 'Informe um valor.' },
    },
    {
      id: 4,
      name: 'observations',
      control: 'UNCONTROLLED',
      type: 'text',
      defaultValue: expense.observations as DefaultValues<FormValues>,
      classNames:
        'mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50',
    },
    {
      id: 5,
      name: 'paymentBarCode',
      control: 'UNCONTROLLED',
      type: 'text',
      defaultValue: expense.paymentBarCode as DefaultValues<FormValues>,
      classNames:
        'mb-2 h-9 w-full content-center rounded border border-neutral-500 bg-neutral-700 pl-1 text-[12px] tracking-widest text-gray-100 outline-none focus:border-gray-50',
    },
    {
      id: 6,
      name: 'type',
      control: 'CONTROLLED',
      type: 'select',
      defaultValue:
        expense.type === ExpenseType.INDIVIDUAL
          ? selectOptions[0]
          : (selectOptions[1] as DefaultValues<FormValues>),
      rules: { required: 'Selecione um tipo.' },
      error: { type: 'required', message: 'Informe um valor.' },
      options: selectOptions,
    },
  ];

  const handleFormSubmit = (data: any) => {
    console.log('DEBUG_OUR-FINANCE <-----> data:', JSON.stringify(data, null, 2));
  };

  return (
    <BlockBackground>
      <BasicModal
        closeButton={
          <CloseButton
            closeAction={() =>
              dispatch(ExpenseActions.setIsOpenUpdateExpenseDialog({ isOpen: false, expenseId: 0 }))
            }
          />
        }
      >
        <Form<FormValues>
          handleFormSubmit={handleFormSubmit}
          inputs={inputs}
          submitText="Atualizar"
        />
      </BasicModal>
    </BlockBackground>
  );
};
