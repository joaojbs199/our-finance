import { PartialExpense } from '@/src/integration/data/models/apiResponse/expense/interfaces';
import { useRef, useState } from 'react';
import { Card } from '@/src/components/BasicCard/component';
import { Clipboard, ClipboardCheck, Pencil, Trash } from 'lucide-react';
import isEmpty from 'is-empty';
import { convertCurrency } from '@/src/utils/Helpers';
import { DateHandler } from '@/src/utils/DateHandler';
import { AppDispatch, useAppDispatch } from '@/src/store/store';
import { updateExpenseStatus } from '@/src/store/modules/expense/asyncThunks';
import { ExpenseActions } from '@/src/slices/expense/expenseSlice';
import { CheckboxInput } from '@/src/components/Inputs/CheckboxInput/component';

interface ExpenseCardProps {
  expense: PartialExpense;
}

export const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const barCodeInput = useRef<HTMLInputElement>(null);
  const [copyBarCode, setCopyBarCode] = useState(false);

  const handleCopyBarCode = () => {
    if (barCodeInput.current) {
      navigator.clipboard.writeText(barCodeInput.current.textContent as string);
      setTimeout(() => {
        setCopyBarCode(false);
      }, 1000);
      setCopyBarCode(true);
    }
  };

  const handleUpdateExpenseStatus = (checked: boolean) => {
    dispatch(updateExpenseStatus({ id: expense.id, status: checked }));
  };

  return (
    <Card>
      <div className="mb-3 flex w-full justify-end gap-2 border-b border-zinc-900 p-2 pt-0 text-gray-100">
        <Pencil
          onClick={() => {
            dispatch(
              ExpenseActions.setIsOpenUpdateExpenseDialog({ isOpen: true, expenseId: expense.id }),
            );
          }}
          className="h-4 w-4 cursor-pointer hover:text-gray-400"
        />
        <Trash
          onClick={() => {
            dispatch(
              ExpenseActions.setIsOpenDeleteExpenseDialog({ isOpen: true, expenseId: expense.id }),
            );
          }}
          className="h-4 w-4 cursor-pointer hover:text-gray-400"
        />
      </div>

      <header className="flex w-full justify-between">
        <p className="text-xs tracking-wider">{expense.description}</p>
        <p className="text-[10px] tracking-widest text-gray-400">
          {DateHandler.formatDateBR(expense.dueDate)}
        </p>
      </header>
      <div className="flex items-center justify-between pt-2">
        <p className="font-poppins text-sm tracking-wide text-orange-400">
          {convertCurrency(expense.value)}
        </p>
        <div className="flex h-8 items-center">
          <CheckboxInput
            onChange={(e) => {
              handleUpdateExpenseStatus(e);
            }}
            styles={{ fontSize: '12px', marginRight: '5px' }}
            value={expense.status}
          />
          <p className="text-xs font-light text-gray-100">{expense.status ? 'Paga' : 'À pagar'}</p>
        </div>
      </div>

      {!isEmpty(expense.observations) && (
        <p className="mt-2 w-full overflow-hidden text-[12px] tracking-widest text-white">
          {expense.observations}
        </p>
      )}

      <div className="relative flex items-end">
        {!isEmpty(expense.paymentBarCode) && (
          <p
            ref={barCodeInput}
            className="mt-2 w-full overflow-hidden rounded border border-neutral-500 p-[1px] pl-1 text-[10px] tracking-widest text-neutral-300"
          >
            {expense.paymentBarCode}
          </p>
        )}
        {!isEmpty(expense.paymentBarCode) && !copyBarCode && (
          <Clipboard
            onClick={() => {
              handleCopyBarCode();
            }}
            className="mb-0.5 ml-2 h-4 w-4"
          />
        )}
        {!isEmpty(expense.paymentBarCode) && copyBarCode && (
          <ClipboardCheck className="mb-0.5 ml-2 h-4 w-4" />
        )}
      </div>
    </Card>
  );
};
