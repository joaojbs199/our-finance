import { joinClassNames } from '@/src/utils/Helpers';
import { X } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface IBasicCloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  closeAction: () => void;
  isDisabled?: boolean;
}

export const CloseButton = ({ closeAction, isDisabled = false }: IBasicCloseButtonProps) => {
  return (
    <X
      className={joinClassNames(
        isDisabled ? 'bg-gray-700 text-gray-500' : 'text-gray-50',
        'h-4 w-4 rounded-full border border-neutral-600 p-0.5 hover:cursor-pointer hover:border-gray-500 hover:text-neutral-400  sm:h-5 sm:w-5',
      )}
      onClick={() => {
        !isDisabled && closeAction();
      }}
    />
  );
};
