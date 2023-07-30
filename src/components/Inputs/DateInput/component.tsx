import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export interface IDateInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  classNames: string;
}

export const DateInput = <T extends FieldValues>({
  name,
  register,
  rules,
  classNames,
  ...props
}: IDateInputProps<T>) => {
  return (
    <input type="date" {...props} {...(register && register(name, rules))} className={classNames} />
  );
};
