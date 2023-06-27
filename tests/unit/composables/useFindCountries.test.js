import { describe, it } from 'vitest';
import useFindCountries from '@/composables/useFindCountries.ts';

describe('useFindCountries', () => {
  const { getFoundedCounties } = useFindCountries();
  it('should return empty table because searchCountryValue is smaller than searchAfterTextLength', () => {
    expect(getFoundedCounties('p', 3)).toHaveLength(0);
  });

  it('should return table with countries', () => {
    expect(getFoundedCounties('pol', 3)).toHaveLength(2);
  });

  it('should return empty table because country not exist', () => {
    expect(getFoundedCounties('test', 3)).toHaveLength(0);
  });
});
