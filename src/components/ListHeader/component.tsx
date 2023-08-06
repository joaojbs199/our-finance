import { ReactNode } from 'react';

interface IListHeaderProps {
  children: ReactNode;
}

export const ListHeader = ({ children }: IListHeaderProps) => {
  return (
    <div className="sm:py4 flex h-fit w-full items-center justify-between bg-neutral-900 px-4 py-2 sm:pl-4">
      {children}
    </div>
  );
};
