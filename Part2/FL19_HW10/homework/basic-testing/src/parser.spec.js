import { describe, expect, it } from 'vitest';
import { extractNumbers } from './parser.js';

describe('#extractNumbers', () => {
  let myFormData = new FormData();
  myFormData.append('num1', '2');
  myFormData.append('num2', '7');

  it(`Input value`, () => {
    expect(extractNumbers(myFormData)).toEqual(['2', '7']);
  });
});
