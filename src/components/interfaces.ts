import {
  UseFormRegister,
  FieldValues,
  FieldPath,
  RegisterOptions,
  FieldErrors,
} from 'react-hook-form';

export type IFormCurrencyInputProps<T extends FieldValues> = {
  receivedValue: number;
} & IFormInputProps<T>;

export type IFormInputProps<T extends FieldValues> = {
  classNames: string;
  register: UseFormRegister<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions;
  errors?: FieldErrors<T>;
};

export interface IUpdateExpenseForm {
  description: string;
  dueDate: string;
  observations: string;
  paymentBarCode: string;
  type: { label: string; value: string };
  value: string;
}
