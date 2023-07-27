import { joinClassNames } from '@/src/utils/Helpers';
import { ClassNamesConfig, GroupBase } from 'react-select';

export const createSelectStyles = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(): ClassNamesConfig<Option, IsMulti, Group> => {
  const styles: ClassNamesConfig<Option, IsMulti, Group> = {
    container: () => 'w-full',
    control: ({ isFocused }) =>
      joinClassNames(
        isFocused ? 'border-gray-50' : 'border-neutral-500',
        'border rounded bg-neutral-700',
      ),
    placeholder: () => 'text-gray-100 pl-1 text-[12px] tracking-widest',
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
    singleValue: () => 'text-[12px] pl-1 text-gray-100 tracking-widest',
  };

  return styles;
};
