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

      <div className="relative m-1 flex-grow bg-gray-200 ">
        <div className="absolute h-full w-full overflow-auto bg-gray-200 p-1">{children}</div>
      </div>
    </>
  );
};
