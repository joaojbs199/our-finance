'use client';

import { getExpenses } from '@/src/store/modules/expense/asyncThunks';
import { AppDispatch, RootState, useAppDispatch } from '@/src/store/store';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemList } from '../List/ItemList';
import { DateHandler } from '@/src/utils/DateHandler';
import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import { convertCurrency, joinClassNames } from '@/src/utils/Helpers';
import isEmpty from 'is-empty';
import { CheckCircle2, Pencil, Clipboard, ClipboardCheck, CheckSquare } from 'lucide-react';

export const ExpenseList = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state);
  const { metadata, data } = state.expense.expenses;
  const { uiState } = state.expense;

  const [barCodeValue, setBarCodeValue] = useState('');
  const [copyBarCode, setCopyBarCode] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleCopyBarCode = () => {
    navigator.clipboard.writeText(barCodeValue);
    setTimeout(() => {
      setCopyBarCode(false);
    }, 1000);
    setCopyBarCode(true);
  };

  useEffect(() => {
    dispatch(
      getExpenses({
        initialDate: '',
        finalDate: '',
      }),
    );
  }, []);

  return (
    <ItemList isLoading={uiState.getExpenses.isLoading}>
      {data.map((expense) => (
        <div className="h-fit px-4 py-2 text-gray-50" key={expense.id}>
          <div className="mb-3 flex w-full justify-end border-b border-zinc-900 p-2 text-gray-100">
            {edit && <CheckSquare className="h-4 w-4" />}
            {!edit && (
              <Pencil
                onClick={() => {
                  setEdit(true);
                }}
                className="h-4 w-4"
              />
            )}
          </div>
          <header className={joinClassNames(!edit ? 'flex justify-between' : '', 'w-full')}>
            {!edit && <p className="text-xs tracking-wider">{expense.description}</p>}
            {edit && (
              <input
                value={expense.description}
                className="mt-2 h-5 w-full resize-none rounded-sm border border-zinc-600 bg-neutral-700 pl-1 text-[10px] text-xs tracking-wider outline-none"
              ></input>
            )}
            {!edit && (
              <p className="text-[10px] tracking-widest text-gray-400">
                {DateHandler.formatDateBR(expense.dueDate)}
              </p>
            )}
            {edit && (
              <input
                onChange={(e) => {
                  console.log('DEBUG_OUR-FINANCE <-----> e:', e.target.value);
                }}
                className="focus: w-full rounded border border-zinc-600 bg-neutral-700 pl-1 text-[12px] font-extralight tracking-wider text-gray-50 outline-none outline-none"
                type="date"
              />
            )}
          </header>
          <div className="flex items-center justify-between pt-2">
            {!edit && (
              <p className="font-poppins text-sm tracking-wide text-orange-400">
                {convertCurrency(expense.value)}
              </p>
            )}
            {edit && (
              <input
                value={convertCurrency(expense.value)}
                className="mt-2 h-5 w-full resize-none rounded-sm border border-zinc-600 bg-neutral-700 pl-1 font-poppins text-[10px] text-sm tracking-wide text-orange-400 outline-none disabled:opacity-50"
              ></input>
            )}
            {!edit && (
              <Checkbox
                checked={expense.status}
                onChange={(e) => {
                  console.log('DEBUG_OUR-FINANCE <-----> e:', e.target.checked);
                }}
                style={{ fontSize: '12px' }}
                color="success-o"
                shape="curve"
              />
            )}
          </div>

          <div className="relative flex items-end">
            {isEmpty(expense.paymentBarCode) && (
              <input
                disabled={!edit}
                onChange={(e) => setBarCodeValue(e.target.value)}
                className="mt-2 h-5 w-full resize-none rounded-sm border border-zinc-600 bg-neutral-700 pl-1 text-[10px] tracking-wider text-gray-50 outline-none disabled:opacity-50"
              ></input>
            )}
            {!edit && !copyBarCode && (
              <Clipboard
                onClick={() => {
                  handleCopyBarCode();
                }}
                className="mb-0.5 ml-2 h-4 w-4"
              />
            )}
            {!edit && copyBarCode && <ClipboardCheck className="mb-0.5 ml-2 h-4 w-4" />}
          </div>

          {isEmpty(expense.observations) && (
            <input
              disabled={!edit}
              maxLength={100}
              className="mt-2 h-5 w-full resize-none rounded-sm border border-zinc-600 bg-neutral-700 pl-1 text-[10px] tracking-wider text-gray-50 outline-none disabled:opacity-50"
            ></input>
          )}
        </div>
      ))}
    </ItemList>
  );
};
