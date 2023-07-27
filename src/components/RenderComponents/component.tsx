import { RootState } from '@/src/store/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

interface IRenderComponentsProps {
  conditionPath: string;
  children: ReactNode;
}

export const RenderComponents = ({ conditionPath, children }: IRenderComponentsProps) => {
  const rootState: any = useSelector((state: RootState) => state);
  const conditionalPath = 'expense.uiState.dialogs.updateExpenseDialog.isOpen';
  const arrayPath = conditionalPath.split('.');

  let condition = rootState;

  arrayPath.forEach((key) => {
    condition = condition[key];
  });

  return <>{condition && { children }}</>;
};
