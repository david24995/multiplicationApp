import { isANumber, isPositiveNumber } from './validation.helper';

describe('Tests validation.helper.ts', () => {
  it('should isPositiveNumber return true if its a valid number', () => {
    const number = 1;
    const isValidNumber = isPositiveNumber(number);

    expect(isValidNumber).toBeTruthy();
  });

  it('should isPositiveNumber return an Error if it is not a valid number', () => {
    const number = 0;
    expect(() => isPositiveNumber(number)).toThrow(
      'Error: base must be greater than 0'
    );
  });

  it('should isANumber return true if its a valid number', () => {
    const number = 12;
    const isValidNumber = isANumber(number);

    expect(isValidNumber).toBeTruthy();
  });

  it('should isANumber return an Error if it is not a valid number', () => {
    const number = 'awe';
    expect(() => isANumber(number)).toThrow(
      'Error: base needs to be a number type'
    );
  });
});
