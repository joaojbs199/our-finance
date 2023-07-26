import Select, { GroupBase, Props } from 'react-select';
import { createSelectStyles } from '@/src/components/Selects/styles';

export type IFormSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group>;

export const StyledSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: IFormSelectProps<Option, IsMulti, Group>,
) => {
  return (
    <Select
      {...props}
      classNames={createSelectStyles<Option, IsMulti, Group>()}
      unstyled
      isClearable
      isSearchable
      placeholder="Selecione uma opção"
    />
  );
};
