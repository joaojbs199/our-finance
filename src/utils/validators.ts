import isEmpty from 'is-empty';

export const isValid = <T>(value: T) => {
  return !isEmpty(value);
};

export const isInvalid = <T>(value: T) => {
  return isEmpty(value);
};
