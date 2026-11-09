import { type Base } from '../constants.js';
import { createDigitValidator } from './create-digit-validator.js';

export const isValidGuess = (guess: string, length: number, base: Base): boolean => {
  const isValidDigit = createDigitValidator(base);
  const areDigitsValid = [...guess].every(isValidDigit);
  const isLengthCorrect = guess.length === length;
  const hasNoRepeats = new Set(guess.toLowerCase()).size === guess.length;
  return isLengthCorrect && areDigitsValid && hasNoRepeats;
};
