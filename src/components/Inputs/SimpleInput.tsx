import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export interface ITextInputProps<T extends FieldValues> {
  name: Path<T>;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
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
    <>
      <input
        type="text"
        {...props}
        {...(register && register(name, rules))}
        className={classNames}
      />
    </>
  );
};
