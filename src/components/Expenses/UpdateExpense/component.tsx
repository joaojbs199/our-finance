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
import { FormValues, OwnerOptions } from './interfaces';
import { DefaultValues } from 'react-hook-form';
import { BasicModal } from '@/src/components/BasicModal/component';
import { CloseButton } from '@/src/components/Buttons/CloseButton/component';
import { IUpdateExpenseRequestParams } from '@/src/integration/data/models/requestParams/expense/interfaces';

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

  const typeOptions = [
    {
      label: 'Individual',
      value: ExpenseType.INDIVIDUAL,
    },
    {
      label: 'Compartilhada',
      value: ExpenseType.SHARED,
    },
  ];

  const ownerOptions: Array<OwnerOptions> = expense.owners.map((owner) => {
    return { label: owner.name, value: owner.id };
  });

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
      isMulti: false,
      defaultValue:
        expense.type === ExpenseType.INDIVIDUAL
          ? typeOptions[0]
          : (typeOptions[1] as DefaultValues<FormValues>),
      rules: { required: 'Selecione um tipo.' },
      options: typeOptions,
    },
    {
      id: 7,
      name: 'owners',
      control: 'CONTROLLED',
      type: 'select',
      isMulti: true,
      placeholder: 'Selecione ao menos uma opção',
      defaultValue: ownerOptions as DefaultValues<FormValues>,
      rules: { required: 'Selecionar responsável.' },
      options: ownerOptions,
    },
  ];

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
      },
      ownerIds: formData.owners.map((owner) => {
        return { id: owner.value };
      }),
    };
    console.log('DEBUG_OUR-FINANCE <-----> updateExpenseParams:', updateExpenseParams);
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
