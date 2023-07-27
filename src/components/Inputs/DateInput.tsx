import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface IDateInputProps<T extends FieldValues> {
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  error?: FieldError | undefined;
  classNames: string;
}

export const DateInput = <T extends FieldValues>({
  name,
  register,
  rules,
  error,
  classNames,
  ...props
}: IDateInputProps<T>) => {
  return (
    <>
      <input
        type="date"
        {...props}
        {...(register && register(name, rules))}
        className={classNames}
      />
      {error && error.type === 'required' && <p>{error.message}</p>}
    </>
  );
};
