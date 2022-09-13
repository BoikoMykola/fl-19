import { describe, expect, test } from 'vitest';
import { transformToNumber } from './numbers.js';

describe('#transformToNumber', () => {
  const testData = [
    {
      inputVal: '23',
      expected: 23
    },
    {
      inputVal: null,
      expected: 0
    },
    {
      inputVal: undefined,
      expected: NaN
    },
    {
      inputVal: 45,
      expected: 45
    },
    {
      inputVal: '',
      expected: 0
    },
    {
      inputVal: 'help',
      expected: NaN
    }
  ];

  testData.forEach((item) => {
    test(`Input value: ${item.inputVal} expected: ${item.expected}`, () => {
      expect(transformToNumber(item.inputVal)).toBe(item.expected);
    });
  });
});
