import { ReactNode } from 'react';
import { Loader } from '@/src/components/Loader/Loader';

interface itemListProps {
  children: ReactNode;
}

export const ItemList = ({ children }: itemListProps) => {
  return (
    <div className="relative m-1 flex-grow">
      <div className="absolute h-full w-full divide-y-[1px] divide-neutral-500 overflow-auto">
        {children}
      </div>
    </div>
  );
};
