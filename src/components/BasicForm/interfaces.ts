import { DefaultValues, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export type IFormInputProps<T extends FieldValues> = {
  id: number;
  name: Path<T>;
  control: 'UNCONTROLLED' | 'CONTROLLED';
  defaultValue?: DefaultValues<T>;
  rules?: RegisterOptions;
  options?: any;
  classNames?: string;
  placeholder?: string;
} & (
  | {
      type: 'text' | 'date' | 'currency';
    }
  | {
      type: 'select';
      isMulti: boolean;
    }
);

export interface IFormProps<T extends FieldValues> {
  handleFormSubmit: (formData: T) => void;
  inputs: Array<IFormInputProps<T>>;
  submitText: string;
}
