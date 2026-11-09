import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from '../src/logic/count-possible-secrets.js';

describe('countPossibleSecrets', () => {
  it('считает количество возможных секретов для заданной основы и длины', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
    expect(countPossibleSecrets(4, 10)).toBe(5040);
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });
  it('возвращает 0, если длина больше основания', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
    expect(countPossibleSecrets(5, 4)).toBe(0);
  });
});
