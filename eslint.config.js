import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
      eqeqeq: 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-restricted-properties': [
        'error',
        { property: 'innerHTML', message: 'Use createElement and textContent.' },
        { property: 'insertAdjacentHTML', message: 'Use createElement and append.' },
      ],
    },
  },
  {
    files: ['src/logic/**/*.ts', 'src/state/**/*.ts', 'src/utils/**/*.ts'],
    rules: {
      'no-restricted-syntax': ['error', 'ClassDeclaration'],
      'no-restricted-globals': ['error', 'document', 'window', 'localStorage'],
    },
  },
  eslintConfigPrettier,
];
