import { Card } from '@/src/components/BasicCard/component';
import { Pencil, Trash } from 'lucide-react';
import { convertCurrency } from '@/src/utils/Helpers';
import { DateHandler } from '@/src/utils/DateHandler';
import { AppDispatch, useAppDispatch } from '@/src/store/store';
import { PartialRevenue } from '@/src/integration/data/models/apiResponse/revenues/interfaces';
import { RevenueType } from '@prisma/client';

interface RevenueCardProps {
  revenue: PartialRevenue;
}

export const RevenueCard = ({ revenue }: RevenueCardProps) => {
  const dispatch: AppDispatch = useAppDispatch();

  return (
    <Card>
      <div className="mb-3 flex w-full justify-end gap-2 border-b border-zinc-900 p-2 pt-0 text-gray-100">
        <Pencil
          onClick={() => {
            console.log('DEBUG_OUR-FINANCE <-----> EDIT');
            // dispatch(
            //   ExpenseActions.setIsOpenUpdateExpenseDialog({ isOpen: true, expenseId: expense.id }),
            // );
          }}
          className="h-4 w-4 cursor-pointer hover:text-gray-400"
        />
        <Trash
          onClick={() => {
            console.log('DEBUG_OUR-FINANCE <-----> TRASH');
            // dispatch(
            //   ExpenseActions.setIsOpenDeleteExpenseDialog({ isOpen: true, expenseId: expense.id }),
            // );
          }}
          className="h-4 w-4 cursor-pointer hover:text-gray-400"
        />
      </div>

      <header className="flex w-full justify-between">
        <p className="text-xs tracking-wider">{revenue.owner.name}</p>
        <p className="text-[10px] tracking-widest text-gray-400">
          {DateHandler.formatDateBR(revenue.date)}
        </p>
      </header>
      <div className="flex items-center justify-between pt-2">
        <p className="font-poppins text-sm tracking-wide text-orange-400">
          {convertCurrency(revenue.value)}
        </p>
        <div className="flex h-8 items-center">
          <p className="text-xs font-light text-gray-100">
            {revenue.type === RevenueType.GENERAL
              ? 'Geral'
              : revenue.type === RevenueType.FOOD
              ? 'Alimentação'
              : ''}
          </p>
        </div>
      </div>

      <p className="w-full overflow-hidden text-xs tracking-widest text-gray-100">
        {revenue.description}
      </p>
    </Card>
  );
};
