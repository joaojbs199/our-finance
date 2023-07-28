import { ChangeEvent, useState } from 'react';
import { FieldErrors, FieldValues, Path } from 'react-hook-form';
import { ErrorMessage } from '@/src/components/ErrorMessage/component';
import { joinClassNames } from '@/src/utils/Helpers';

export type IFormCurrencyInputProps<T extends FieldValues> = {
  /**
   * React-hook-form method to handle changes on the input.
   * @param event Value inserted on the input
   * @returns void
   */
  onChange: (...event: any[]) => void;
  /**
   * Form input errors to warning.
   */
  error?: FieldErrors<T>[Path<T>];
  /**
   * Classes to style the input.
   */
  classNames: string;
  /**
   * The default value for input. Must be in "R$ 0,00" format.
   */
  value: string;
};

/**
 *
 * @param classNames Classes to style the input.
 * @param register React-hook-form method to make form recognize the input.
 * @param name The name of input for register.
 * @param rules Validation rules to submit form correctly.
 * @param value The default value for input. Must be in "R$ 0,00" format.
 * @returns Input to type currency values.
 */
export const CurrencyInput = <T extends FieldValues>({
  classNames,
  error,
  value,
  onChange,
  ...props
}: IFormCurrencyInputProps<T>) => {
  const [formattedValue, setFormattedValue] = useState<string>(value);

  const formatMoney = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const userInput: string = e.target.value.replace(/[^0-9]/g, '');

    if (userInput === '') {
      onChange('R$ 0,00');
      setFormattedValue('R$ 0,00');
    } else {
      const userInputAsNumber: number = parseInt(userInput, 10) / 100;

      const formattedNumber = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(userInputAsNumber);

      onChange(formattedNumber);
      setFormattedValue(formattedNumber);
    }
  };

  return (
    <>
      <input
        {...props}
        className={joinClassNames(
          error ? 'border-red-500 text-red-500 focus:border-red-500' : '',
          classNames,
        )}
        onChange={formatMoney}
        value={formattedValue}
      />
      {error && error.type === 'validate' && <ErrorMessage message={error.message as string} />}
    </>
  );
};
