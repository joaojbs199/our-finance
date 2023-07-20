import { ReactNode } from 'react';
import { Loader } from '@/src/components/Loader/Loader';

interface itemListProps {
  children: ReactNode;
  isLoading: boolean;
}

export const ItemList = ({ isLoading, children }: itemListProps) => {
  return (
    <>
      {isLoading && <Loader />}

      <div className="relative m-1 flex-grow">
        <div className="absolute h-full w-full divide-y-[2px] divide-neutral-500 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};
