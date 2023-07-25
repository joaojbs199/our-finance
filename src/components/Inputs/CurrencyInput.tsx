import { ChangeEvent, useEffect, useState } from 'react';
import { IFormCurrencyInputProps } from '@/src/components/interfaces';

export const CurrencyInput = ({ receivedValue, classNames, onChange }: IFormCurrencyInputProps) => {
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

    onChange(formattedValue);
    setFormattedValue({ numberValue: receivedValue, stringValue: formattedValue });
  }, [onChange, receivedValue]);

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

      onChange(formattedNumber);
      setFormattedValue({ numberValue: userInputAsNumber, stringValue: formattedNumber });
    }
  };

  return (
    <>
      <input className={classNames} onChange={formatMoney} value={formattedValue.stringValue} />
    </>
  );
};
