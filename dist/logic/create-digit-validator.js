import { DIGITS } from '../constants.js';
export const createDigitValidator = (base) => {
    const validDigits = [...DIGITS.slice(0, base)];
    return (digit) => validDigits.includes(digit.toLowerCase());
};
//# sourceMappingURL=create-digit-validator.js.map