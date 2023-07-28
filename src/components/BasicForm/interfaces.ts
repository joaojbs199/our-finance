import { DefaultValues, FieldError, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface IFormInputProps<T extends FieldValues> {
  id: number;
  name: Path<T>;
  control: 'UNCONTROLLED' | 'CONTROLLED';
  type: 'text' | 'date' | 'select' | 'currency';
  defaultValue?: DefaultValues<T>;
  rules?: RegisterOptions;
  options?: any;
  error?: FieldError | undefined;
  classNames?: string;
}

export interface IFormProps<T extends FieldValues> {
  handleFormSubmit: (formData: T) => void;
  inputs: Array<IFormInputProps<T>>;
  submitText: string;
}
