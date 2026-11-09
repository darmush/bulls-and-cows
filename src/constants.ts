export const DIGITS = '0123456789abcdef';

export const BASES = [2, 8, 10, 16] as const;

export type Base = (typeof BASES)[number];
