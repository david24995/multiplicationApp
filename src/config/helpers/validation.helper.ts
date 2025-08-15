export const isPositiveNumber = (number: number) => {
  if (number < 1) throw 'Error: base must be greater than 0';
  return true;
};

export const isANumber = (number: any) => {
  if (isNaN(number)) throw 'Error: base needs to be a number type';
  return true;
};
