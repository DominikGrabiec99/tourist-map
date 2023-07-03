import { describe, it, beforeAll } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCountryInformationStore } from '@/stores/useCountryInformationStore';

describe('useCountryInformationStore', () => {
  let countryInformationStore;

  beforeAll(() => {
    setActivePinia(createPinia());
  });

  beforeEach(() => {
    countryInformationStore = useCountryInformationStore();
  });

  afterEach(() => {
    countryInformationStore.$reset();
  });

  it('should fetch all polish exchange rates', async () => {
    await countryInformationStore.fetchPolishExchangeRates();
    expect(countryInformationStore.$state.exchangeRates).toHaveLength(162);
  });

  it('should fetch data country by id', async () => {
    await countryInformationStore.fetchCountryById('pl', 'Polska');
    expect(countryInformationStore.$state.countriesInformation).toHaveLength(1);
  });

  it("shouldn't fetch the same country", async () => {
    await countryInformationStore.fetchCountryById('pl', 'Polska');
    expect(countryInformationStore.$state.countriesInformation).toHaveLength(1);

    await countryInformationStore.fetchCountryById('pl', 'Polska');
    expect(countryInformationStore.$state.countriesInformation).toHaveLength(1);

    await countryInformationStore.fetchCountryById('de', 'Niemcy');
    expect(countryInformationStore.$state.countriesInformation).toHaveLength(2);
  });
});
