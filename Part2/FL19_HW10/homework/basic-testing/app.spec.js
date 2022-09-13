// @vitest-environment jsdom
import { describe, expect, test } from 'vitest';
import {getResult} from './app.js';

describe('#getResult', () => {
  const testData = [
    {
      inputVal: ['23', '3'],
      expected: '26'
    },
    {
      inputVal: ['23', '  '],
      expected: 'invalid'
    },
    {
      inputVal: ['23', 'help '],
      expected: 'invalid'
    },
    {
      inputVal: ['23', '  4'],
      expected: '27'
    }
  ];

  testData.forEach((item) => {
    test(`Input value: ${item.inputVal} expected: ${item.expected}`, () => {
      expect(getResult(item.inputVal)).toBe(item.expected);
    });
  });
});