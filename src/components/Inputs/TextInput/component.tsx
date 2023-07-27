import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/src/components/ErrorMessage/component';

export interface ITextInputProps<T extends FieldValues> {
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  error?: FieldErrors<T>[Path<T>];
  classNames: string;
}

export const TextInput = <T extends FieldValues>({
  name,
  register,
  rules,
  error,
  classNames,
  ...props
}: ITextInputProps<T>) => {
  return (
    <>
      <input
        type="text"
        {...props}
        {...(register && register(name, rules))}
        className={classNames}
      />
      {error && error.type === 'required' && <ErrorMessage message={error.message as string} />}
    </>
  );
};
