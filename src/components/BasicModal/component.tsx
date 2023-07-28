import { ReactNode } from 'react';

interface IBasicModalProps {
  children: ReactNode;
  closeButton: ReactNode;
}

export const BasicModal = ({ children, closeButton }: IBasicModalProps) => {
  return (
    <div className="z-30 h-fit w-[95%] max-w-md rounded-md bg-neutral-800">
      <header className="flex w-full justify-end border-b border-neutral-700 p-1 sm:p-2">
        {closeButton}
      </header>
      {children}
    </div>
  );
};
