import { X } from 'lucide-react';

interface IBasicCloseButtonProps {
  closeAction: () => void;
}

export const CloseButton = ({ closeAction }: IBasicCloseButtonProps) => {
  return (
    <X
      className="h-4 w-4 rounded-full border border-neutral-600 p-0.5 text-gray-50 hover:cursor-pointer hover:border-gray-500 hover:text-neutral-400 sm:h-5 sm:w-5"
      onClick={() => {
        closeAction();
      }}
    />
  );
};
