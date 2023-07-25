import { GroupBase, Props, PropsValue } from 'react-select';

export type IFormCurrencyInputProps = {
  receivedValue: number;
  classNames: string;
  onChange: (...event: any[]) => void;
};

export type IFormSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = {
  initialValue: PropsValue<Option> | undefined;
  value: PropsValue<Option> | undefined;
  onChange: (...event: any[]) => void;
} & Props<Option, IsMulti, Group>;

export interface IUpdateExpenseForm {
  description: string;
  dueDate: string;
  observations: string;
  paymentBarCode: string;
  type: { label: string; value: string };
  value: string;
}
