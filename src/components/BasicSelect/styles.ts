import { joinClassNames } from '@/src/utils/Helpers';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { ClassNamesConfig, GroupBase } from 'react-select';

export const createSelectStyles = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  error:
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          label: string;
          value: string;
        }>
      >
    | undefined,
): ClassNamesConfig<Option, IsMulti, Group> => {
  const styles: ClassNamesConfig<Option, IsMulti, Group> = {
    container: () => 'w-full',
    control: ({ isFocused }) =>
      joinClassNames(
        isFocused && !error
          ? 'border-gray-50'
          : isFocused && error
          ? 'border-red-500'
          : !isFocused && error
          ? 'border-red-500'
          : 'border-neutral-500',
        'border mb-2 rounded bg-neutral-700',
      ),
    placeholder: ({ isDisabled }) =>
      joinClassNames(
        isDisabled ? 'text-gray-500' : error ? 'text-red-500' : 'text-gray-100',
        'pl-1 text-[12px] tracking-widest',
      ),
    indicatorSeparator: () => 'border h-7 border-neutral-500 m-auto',
    dropdownIndicator: ({ isFocused }) =>
      joinClassNames(
        isFocused ? 'text-neutral-200' : 'text-neutral-500',
        'p-1 hover:text-neutral-200',
      ),
    clearIndicator: () => 'p-1 text-red-500 hover:text-red-400',
    menu: () => 'w-full mt-0 bg-neutral-800 border border-neutral-700 text-[12px] rounded-md',
    option: ({ isSelected }) =>
      joinClassNames(
        isSelected ? 'bg-neutral-700' : '',
        'p-1 text-gray-100 tracking-widest cursor-pointer hover:bg-neutral-700',
      ),
    noOptionsMessage: () => 'text-gray-300 tracking-wider',
    singleValue: ({ isDisabled }) =>
      joinClassNames(
        isDisabled ? 'text-gray-500' : 'text-gray-100',
        'text-[12px] pl-1 tracking-widest',
      ),
    multiValue: ({ isDisabled }) =>
      joinClassNames(
        isDisabled ? 'text-gray-500' : 'text-gray-100',
        'text-[11px] pl-1 rounded border border-neutral-500 bg-neutral-500 ml-1  tracking-widest',
      ),
  };

  return styles;
};
