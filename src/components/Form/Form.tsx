import { ReactNode } from 'react';
import { BlockBackground } from '../BlockBackground/BlockBackground';

interface ActionFormProps {
  children: ReactNode;
  handleIsOpen?: (isOpen: boolean) => void;
}

export const ActionForm = ({ children }: ActionFormProps) => {
  return (
    <BlockBackground>
      <div className="z-30 h-3/5 w-[95%] bg-red-500">{children}</div>
    </BlockBackground>
  );
};
