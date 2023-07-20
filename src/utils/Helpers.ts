export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const joinClassNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(' ');
};

export const convertCurrency = (value: number) => {
  const intl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const formatedValue = intl.format(value);
  return formatedValue;
};
