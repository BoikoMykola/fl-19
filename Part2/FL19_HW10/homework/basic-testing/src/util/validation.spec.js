import { describe, expect, test } from 'vitest';
import { validateStringNotEmpty, validateNumber } from './validation.js';

describe('#ThrowError', () => {
  const testData = ['', '  '];
  const testNaN = [' call', 'NaN', 'help'];

  testData.forEach((item) => {
    test('throws on validateStringNotEmpty', () => {
      expect(() => validateStringNotEmpty(item)).toThrowError(
        /^Invalid input - must not be empty.$/
      );
    });
  });

  testNaN.forEach((item) => {
    test('throws on validateNumber', () => {
      expect(() => validateNumber(item)).toThrowError(
        /^Invalid number input.$/
      );
    });
  });
});
