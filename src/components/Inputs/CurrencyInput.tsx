import { ChangeEvent, useEffect, useState } from 'react';
import { IFormCurrencyInputProps } from '@/src/components/interfaces';
import { FieldValues } from 'react-hook-form';

export const CurrencyInput = <T extends FieldValues>({
  classNames,
  receivedValue,
  register,
  errors,
  name,
  rules,
}: IFormCurrencyInputProps<T>) => {
  const [formattedValue, setFormattedValue] = useState({
    numberValue: 0,
    stringValue: '',
  });

  useEffect(() => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(receivedValue);

    setFormattedValue({ numberValue: receivedValue, stringValue: formattedValue });
  }, [receivedValue]);

  const formatMoney = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const userInput: string = e.target.value.replace(/[^0-9]/g, '');

    if (userInput === '') {
      setFormattedValue({ numberValue: 0, stringValue: 'R$ 0,00' });
    } else {
      const userInputAsNumber: number = parseInt(userInput, 10) / 100;

      const formattedNumber = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(userInputAsNumber);

      setFormattedValue({ numberValue: userInputAsNumber, stringValue: formattedNumber });
    }
  };

  return (
    <>
      <input
        type="text"
        {...register(name, rules)}
        onChange={formatMoney}
        value={formattedValue.stringValue}
        className={classNames}
      />
      {errors && <p>{errors.root?.message}</p>}
    </>
  );
};
