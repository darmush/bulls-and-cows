import { memoize } from '../utils/memoize.js';

const count = (length: number, base: number): number => {
  if (length === 0) return 1;
  return base * countPossibleSecrets(length - 1, base - 1);
};

export const countPossibleSecrets = memoize(count);
