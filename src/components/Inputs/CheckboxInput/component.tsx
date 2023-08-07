import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import { CSSProperties } from 'react';

interface ICheckboxInputProps {
  value: boolean;
  styles: CSSProperties | undefined;
  onChange: (...event: any[]) => void;
}

export const CheckboxInput = ({ value, styles, onChange }: ICheckboxInputProps) => {
  return (
    <Checkbox
      checked={value}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
      style={styles}
      color="success-o"
      shape="curve"
    />
  );
};
