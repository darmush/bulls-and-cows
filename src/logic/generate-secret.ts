import { type Base, DIGITS } from '../constants.js';

export const generateSecret = (
  length: number,
  base: Base,
  random: () => number = Math.random,
): string => {
  const pick = (available: string[], count: number): string => {
    if (count <= 0) return '';
    const digit = available[getRandomIndex(random, available.length)];
    const rest = available.filter((el) => el !== digit);
    return digit + pick(rest, count - 1);
  };

  return pick([...DIGITS.slice(0, base)], length);
};

const getRandomIndex = (random: () => number, length: number): number =>
  Math.floor(random() * length);
