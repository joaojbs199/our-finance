import Select, { GroupBase, Props } from 'react-select';
import { createSelectStyles } from '@/src/components/Selects/styles';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

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
} & Props<Option, IsMulti, Group>;

export const StyledSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  error,
  ...props
}: IFormSelectProps<Option, IsMulti, Group>) => {
  return (
    <>
      <Select
        {...props}
        classNames={createSelectStyles<Option, IsMulti, Group>()}
        unstyled
        isClearable
        isSearchable
        placeholder="Selecione uma opção"
      />
      {error && error.type === 'required' && <p>{error.message}</p>}
    </>
  );
};
