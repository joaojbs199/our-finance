import { joinClassNames } from '@/src/utils/Helpers';
import { ReactNode } from 'react';

interface IFormInputWrapperProps {
  children: ReactNode;
  classNames: string;
}

export const FormInputWrapper = ({ children, classNames }: IFormInputWrapperProps) => {
  return <div className={joinClassNames(classNames, 'w-full py-[3px]')}>{children}</div>;
};
