import { expect, test } from 'vitest';
import {generateTokenPromise} from './async-example.js';
import jwt from 'jsonwebtoken';

test(`Input value:`, async () => {
  const token = await generateTokenPromise('test@test.com').then((token) => {
    return token
  });
  expect(jwt.decode(token).email).toBe('test@test.com');
});