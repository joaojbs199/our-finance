export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const joinClassNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(' ');
};
