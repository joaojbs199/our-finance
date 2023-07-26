import { ChangeEvent, useState } from 'react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

/* Use this to controlled currency input */

/* export type IFormCurrencyInputProps = {
  value: string;
  classNames: string;
  onChange: (...event: any[]) => void;
};

export const CurrencyInput = ({ classNames, onChange, value }: IFormCurrencyInputProps) => {
  const [formattedValue, setFormattedValue] = useState<string>(value);

  const formatMoney = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const userInput: string = e.target.value.replace(/[^0-9]/g, '');

    if (userInput === '') {
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
      <input className={classNames} onChange={formatMoney} value={formattedValue} />
    </>
  );
}; */

export type IFormCurrencyInputProps<T extends FieldValues> = {
  /**
   * The name of input for register.
   */
  name: Path<T>;
  /**
   * Validation rules to submit form correctly.
   */
  rules?: RegisterOptions;
  /**
   * React-hook-form method to make form recognize the input.
   */
  register?: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
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
  register,
  name,
  rules,
  value,
  ...props
}: IFormCurrencyInputProps<T>) => {
  const [formattedValue, setFormattedValue] = useState<string>(value);

  const formatMoney = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const userInput: string = e.target.value.replace(/[^0-9]/g, '');

    if (userInput === '') {
      setFormattedValue('R$ 0,00');
    } else {
      const userInputAsNumber: number = parseInt(userInput, 10) / 100;

      const formattedNumber = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(userInputAsNumber);

      setFormattedValue(formattedNumber);
    }
  };

  return (
    <>
      <input
        {...props}
        {...(register && register(name, rules))}
        className={classNames}
        onChange={formatMoney}
        value={formattedValue}
      />
    </>
  );
};
