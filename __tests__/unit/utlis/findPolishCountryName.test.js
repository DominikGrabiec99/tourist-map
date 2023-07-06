import { describe, it } from 'vitest';
import findPolishCountryName from '@/utils/findPolishCountryName.ts';

describe('findPolishCountryName', () => {
  it('check id i empty string', () => {
    expect(findPolishCountryName('')).toBe('');
  });

  it('check correct country id value', () => {
    expect(findPolishCountryName('pl')).toBe('Polska');
  });

  it('check unCorrect country id value', () => {
    expect(findPolishCountryName('test')).toBe('');
  });
});
