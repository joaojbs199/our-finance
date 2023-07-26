import { GroupBase, Props } from 'react-select';

export type IFormCurrencyInputProps = {
  value: string;
  classNames: string;
  onChange: (...event: any[]) => void;
};

export type IFormSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group>;

export interface IUpdateExpenseForm {
  description: string;
  dueDate: string;
  observations: string;
  paymentBarCode: string;
  type: { label: string; value: string };
  value: string;
}
