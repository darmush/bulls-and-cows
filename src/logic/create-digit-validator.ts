import { DIGITS, type Base } from '../constants.js';

export const createDigitValidator = (base: Base) => {
  const validDigits = [...DIGITS.slice(0, base)];

  return (digit: string): boolean => validDigits.includes(digit.toLowerCase());
};
