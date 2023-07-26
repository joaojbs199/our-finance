import { ChangeEvent, useState } from 'react';
import { IFormCurrencyInputProps } from '@/src/components/interfaces';

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
};
