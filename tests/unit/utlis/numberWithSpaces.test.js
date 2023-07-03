import { describe, it } from 'vitest';
import numberWithSpaces from '@/utils/numberWithSpaces.ts';

describe('numberWithSpaces', () => {
  it('check number contain spaces', () => {
    const number = numberWithSpaces(100000);
    expect(number).toBe('100 000');
  });
});
