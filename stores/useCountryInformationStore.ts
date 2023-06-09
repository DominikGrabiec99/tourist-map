import { defineStore } from 'pinia';

/** INTERFACES */
import ICountryInformation from '@/ts/interfaces/CountryInformation';
import IExchangeRates from '@/ts/interfaces/ExchangeRates';
import IMainCurrency from '@/ts/interfaces/MainCurrency';

interface IRootType {
  countriesInformation: ICountryInformation[];
  exchangeRates: IExchangeRates[];
}

/** UTILS */
import mapFetchCountry from '@/utils/mapFetchCountry';

/** CONSTANTS */
import MAIN_CURRENCY from '@/constants/mainCurrency';

export const useCountryInformationStore = defineStore(
  'useCountryInformationStore',
  {
    state: (): IRootType => {
      return {
        countriesInformation: [],
        exchangeRates: [],
      };
    },
    getters: {
      getMainCurrencies: (state) => {
        return state.exchangeRates.reduce((acc: IMainCurrency[], curr) => {
          const foundedCurrency = MAIN_CURRENCY.find(
            (currency) => currency.code === curr.code
          );
          if (
            !foundedCurrency ||
            acc.find((currency) => currency?.code === curr.code)
          )
            return acc;
          acc.push({
            code: curr.code,
            symbol: foundedCurrency.symbol,
            bgPositionX: foundedCurrency.bgPositionX,
            bgPositionY: foundedCurrency.bgPositionY,
            name: foundedCurrency.name,
            mid: curr.mid,
            priority: foundedCurrency.priority,
          });
          return acc;
        }, []);
      },
    },
    actions: {
      async fetchPolishExchangeRates(): Promise<void> {
        try {
          const exchangeRatesA = await fetch(
            'https://api.nbp.pl/api/exchangerates/tables/A?format=json'
          );

          const exchangeRatesADate = await exchangeRatesA.json();
          const exchangeRatesB = await fetch(
            'https://api.nbp.pl/api/exchangerates/tables/B?format=json'
          );
          const exchangeRatesBDate = await exchangeRatesB.json();
          const exchangeRatesC = await fetch(
            'https://api.nbp.pl/api/exchangerates/tables/C?format=json'
          );
          const exchangeRatesCDate = await exchangeRatesC.json();

          if (
            exchangeRatesA.status !== 200 ||
            exchangeRatesB.status !== 200 ||
            exchangeRatesC.status !== 200
          ) {
            throw new Error("Can't fetch exchange rates information");
          }
          this.exchangeRates = [
            ...exchangeRatesADate[0].rates,
            ...exchangeRatesBDate[0].rates,
            ...exchangeRatesCDate[0].rates,
          ];
        } catch (error) {
          this.exchangeRates = [];
          console.error('fetchPolishExchangeRates', error);
        }
      },
      async fetchCountryById(id: string, polishCountryName: string) {
        try {
          const foundedCountry = this.countriesInformation.find(
            (country: ICountryInformation) =>
              country.id?.value.toLowerCase() === id.toLowerCase()
          );

          if (foundedCountry) {
            return foundedCountry;
          }
          const fetchData = await fetch(
            `https://restcountries.com/v3.1/alpha/${id}`
          );
          if (fetchData.status !== 200) {
            throw new Error("Can't fetch country information");
          }
          const countryDate = await fetchData.json();

          const countryInformation: ICountryInformation = mapFetchCountry(
            countryDate,
            polishCountryName
          );

          this.countriesInformation.push(countryInformation);

          return countryInformation;
        } catch (error) {
          console.error('fetchCountryById', error);
          return undefined;
        }
      },
    },
  }
);
