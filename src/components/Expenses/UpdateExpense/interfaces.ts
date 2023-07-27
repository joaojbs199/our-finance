type SelectOption = {
  label: string;
  value: string;
};

export interface FormValues {
  description: string;
  dueDate: string;
  observations: string | null;
  paymentBarCode: string | null;
  type: SelectOption;
  value: string;
}
