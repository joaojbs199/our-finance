'use client';

import { Plus } from 'lucide-react';

interface ICreatButtonProps {
  createAction: () => void;
}

export const CreateButton = ({ createAction }: ICreatButtonProps) => {
  return (
    <Plus
      className="h-6 w-7 rounded-full bg-orange-500 p-0.5 text-gray-100 hover:cursor-pointer hover:bg-orange-400 sm:h-7 sm:w-9"
      onClick={() => {
        createAction();
      }}
    />
  );
};
