import { describe, expect, it } from 'vitest';
import { createDigitValidator } from '../src/logic/create-digit-validator.js';

describe('createDigitValidator', () => {
  it('принимает только 0 и 1 для двоичных чисел', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
    expect(isBinaryDigit('2')).toBe(false);
  });

  it('принимает только 0-7 для восьмеричных чисел', () => {
    const isOctalDigit = createDigitValidator(8);
    expect(isOctalDigit('0')).toBe(true);
    expect(isOctalDigit('7')).toBe(true);
    expect(isOctalDigit('8')).toBe(false);
  });

  it('принимает только 0-9 для десятичных чисел', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(isDecimalDigit('0')).toBe(true);
    expect(isDecimalDigit('9')).toBe(true);
    expect(isDecimalDigit('a')).toBe(false);
  });

  it('принимает только 0-9 и A-F для шестнадцатеричных чисел независимо от регистра', () => {
    const isHexadecimalDigit = createDigitValidator(16);
    expect(isHexadecimalDigit('0')).toBe(true);
    expect(isHexadecimalDigit('9')).toBe(true);
    expect(isHexadecimalDigit('A')).toBe(true);
    expect(isHexadecimalDigit('F')).toBe(true);
    expect(isHexadecimalDigit('f')).toBe(true);
    expect(isHexadecimalDigit('G')).toBe(false);
  });

  it('отклоняет всё, что не является одним символом', () => {
    const isHexadecimalDigit = createDigitValidator(16);
    expect(isHexadecimalDigit('')).toBe(false);
    expect(isHexadecimalDigit(' ')).toBe(false);
    expect(isHexadecimalDigit('-')).toBe(false);
    expect(isHexadecimalDigit('1a')).toBe(false);
  });
});
