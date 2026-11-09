import { DIGITS } from '../constants.js';
export const generateSecret = (length, base, random = Math.random) => {
    const pick = (available, count) => {
        if (count <= 0)
            return '';
        const digit = available[getRandomIndex(random, available.length)];
        const rest = available.filter((el) => el !== digit);
        return digit + pick(rest, count - 1);
    };
    return pick([...DIGITS.slice(0, base)], length);
};
const getRandomIndex = (random, length) => Math.floor(random() * length);
//# sourceMappingURL=generate-secret.js.map