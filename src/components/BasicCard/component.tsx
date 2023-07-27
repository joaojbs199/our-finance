import { ReactNode } from 'react';
interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return <div className="h-fit px-4 py-2 text-gray-50">{children}</div>;
};
