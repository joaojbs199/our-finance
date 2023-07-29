import Select, { GroupBase, Props } from 'react-select';
import { createSelectStyles } from '@/src/components/BasicSelect/styles';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { ErrorMessage } from '@/src/components/ErrorMessage/component';

export type IFormSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = {
  /**
   * Form input errors to warning.
   */
  error?:
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          label: string;
          value: string;
        }>
      >
    | undefined;
  placeholder?: string;
} & Props<Option, IsMulti, Group>;

export const StyledSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  error,
  placeholder = 'Selecione uma opção',
  ...props
}: IFormSelectProps<Option, IsMulti, Group>) => {
  return (
    <>
      <Select
        {...props}
        classNames={createSelectStyles<Option, IsMulti, Group>(error)}
        unstyled
        isClearable
        isSearchable
        placeholder={placeholder}
      />
      {error && error.type === 'required' && <ErrorMessage message={error.message as string} />}
      {error && error.type === 'validate' && <ErrorMessage message={error.message as string} />}
    </>
  );
};
