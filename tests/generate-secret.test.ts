import { describe, expect, it } from 'vitest';
import { generateSecret } from '../src/logic/generate-secret.js';

describe('generateSecret', () => {
  it('генерирует секрет заданной длины', () => {
    expect(generateSecret(6, 8)).toHaveLength(6);
  });
  it('генерирует секрет из уникальных символов', () => {
    expect(new Set(generateSecret(4, 16)).size).toBe(4);
  });
  it('сохраняет ноль в начале', () => {
    expect(generateSecret(4, 8, () => 0)).toBe('0123');
  });
  it('использует буквы для шестнадцатеричной системы', () => {
    expect(generateSecret(4, 16, () => 0.99)).toBe('fedc');
  });
  it('возвращает предсказуемый секрет при детерминированном random', () => {
    expect(generateSecret(4, 10, () => 0.99)).toBe('9876');
  });
});
