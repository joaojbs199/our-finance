import { ReactNode } from 'react';

interface BlockBackgroundProps {
  children?: ReactNode;
}

export const BlockBackground = ({ children }: BlockBackgroundProps) => {
  return (
    <div className="absolute flex h-full w-full flex-wrap items-center justify-center">
      <div
        role="status"
        className=" fixed left-0 top-0 z-20 block h-full w-full bg-gray-700 opacity-50"
      />
      {children}
    </div>
  );
};
