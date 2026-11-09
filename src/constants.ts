export const DIGITS = '0123456789abcdef';

export const BASES = [2, 8, 10, 16] as const;

export type Base = (typeof BASES)[number];

export const BASE_LABELS: Record<Base, string> = {
  2: 'bin',
  8: 'oct',
  10: 'dec',
  16: 'hex',
};

export const MIN_LENGTH = 2;
export const MAX_LENGTH = 6;
