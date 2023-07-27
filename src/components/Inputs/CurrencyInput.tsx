import { ChangeEvent, useState } from 'react';
import { FieldError } from 'react-hook-form';

export type IFormCurrencyInputProps = {
  /**
   * React-hook-form method to handle changes on the input.
   * @param event Value inserted on the input
   * @returns void
   */
  onChange: (...event: any[]) => void;
  /**
   * Form input errors to warning.
   */
  error?: FieldError | undefined;
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
export const CurrencyInput = ({
  classNames,
  error,
  value,
  onChange,
  ...props
}: IFormCurrencyInputProps) => {
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
      <input {...props} className={classNames} onChange={formatMoney} value={formattedValue} />
      {error && error.type === 'validate' && <p>{error.message}</p>}
    </>
  );
};
