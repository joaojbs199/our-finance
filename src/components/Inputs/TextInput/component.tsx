import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

export interface ITextInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  classNames: string;
}

export const TextInput = <T extends FieldValues>({
  name,
  register,
  rules,
  classNames,
  ...props
}: ITextInputProps<T>) => {
  return (
    <input type="text" {...props} {...(register && register(name, rules))} className={classNames} />
  );
};
