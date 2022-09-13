import { describe, expect, test } from 'vitest';
import { add } from './math.js';

describe('#add', () => {
  test('returns 9 with 4 + 5', () => {
    expect(add([4, 5])).toBe(9);
  });

  test('returns 15 with 4 + 5 + 6', () => {
    expect(add([4, 5, 6])).toBe(15);
  });
});
