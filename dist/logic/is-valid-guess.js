import { createDigitValidator } from './create-digit-validator.js';
export const isValidGuess = (guess, length, base) => {
    const isValidDigit = createDigitValidator(base);
    const areDigitsValid = [...guess].every(isValidDigit);
    const isLengthCorrect = guess.length === length;
    const hasNoRepeats = new Set(guess.toLowerCase()).size === guess.length;
    return isLengthCorrect && areDigitsValid && hasNoRepeats;
};
//# sourceMappingURL=is-valid-guess.js.map