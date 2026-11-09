import { describe, expect, it } from 'vitest';
import { evaluateGuess } from '../src/logic/evaluate-guess.js';

describe('evaluateGuess', () => {
  it('считает быков, цифры на своих местах', () => {
    expect(evaluateGuess('0123', '0123')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('0123', '0426')).toEqual({ bulls: 2, cows: 0 });
  });
  it('считает коров, цифры не на своих местах', () => {
    expect(evaluateGuess('0123', '1230')).toEqual({ bulls: 0, cows: 4 });
    expect(evaluateGuess('0123', '8236')).toEqual({ bulls: 0, cows: 2 });
  });
  it('считает быков и коров вместе', () => {
    expect(evaluateGuess('0123', '0321')).toEqual({ bulls: 2, cows: 2 });
  });
  it('возвращает нули, если совпадений нет', () => {
    expect(evaluateGuess('0123', '5678')).toEqual({ bulls: 0, cows: 0 });
  });
  it('не учитывает регистр hex-цифр', () => {
    expect(evaluateGuess('ab3', 'AB3')).toEqual({ bulls: 3, cows: 0 });
    expect(evaluateGuess('ab3', 'B3A')).toEqual({ bulls: 0, cows: 3 });
  });
});
