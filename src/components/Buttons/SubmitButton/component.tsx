import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface ISubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean;
  text: string;
  formId: string;
}

export const SubmitButton = ({ formId, isSubmitting, text }: ISubmitButtonProps) => {
  return (
    <button
      form={formId}
      type="submit"
      className="duration-250 mt-5 flex h-9 w-full max-w-[200px] items-center justify-center rounded-md border border-neutral-700 bg-orange-500 text-gray-100 transition-all hover:bg-orange-400 hover:text-gray-50 disabled:bg-orange-400"
    >
      {isSubmitting ? (
        <Loader2 className="font-extrabold5 h-5 w-5 animate-spin text-gray-100" />
      ) : (
        text
      )}
    </button>
  );
};
