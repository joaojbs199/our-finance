export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface IMetadata {
  totalResults: number;
}

export type ISODate = `${Year}-${Month}-${Day}`;

type Digit = `0` | `1` | `2` | `3` | `4` | `5` | `6` | `7` | `8` | `9`;
type Year = `${2}${0}${Digit}${Digit}`;
type Month = '01' | '02' | '03' | '04' | '05' | '05' | '07' | '08' | '09' | '10' | '11' | '12';
type Day =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '05'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31';
