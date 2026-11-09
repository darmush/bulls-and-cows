import { describe, expect, it } from 'vitest';
import { isValidGuess } from '../src/logic/is-valid-guess.js';

describe('isValidGuess', () => {
  it('проверяет совпадение длины', () => {
    expect(isValidGuess('01', 2, 10)).toBe(true);
    expect(isValidGuess('012', 3, 10)).toBe(true);
    expect(isValidGuess('01', 3, 10)).toBe(false);
    expect(isValidGuess('0123', 3, 10)).toBe(false);
    expect(isValidGuess('', 3, 10)).toBe(false);
  });
  it('проверяет, что все символы допустимые для указанного base', () => {
    expect(isValidGuess('01', 2, 2)).toBe(true);
    expect(isValidGuess('A3F', 3, 16)).toBe(true);
    expect(isValidGuess('019', 3, 8)).toBe(false);
    expect(isValidGuess('10f5', 4, 10)).toBe(false);
  });
  it('проверяет символы на повтор', () => {
    expect(isValidGuess('aB', 2, 16)).toBe(true);
    expect(isValidGuess('Aa', 2, 16)).toBe(false);
    expect(isValidGuess('3345', 4, 16)).toBe(false);
  });
});
