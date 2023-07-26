import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export interface IDateInputProps<T extends FieldValues> {
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
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
    <>
      <input
        type="date"
        {...props}
        {...(register && register(name, rules))}
        className={classNames}
      />
    </>
  );
};
