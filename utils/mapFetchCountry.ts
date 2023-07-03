/** INTERFACES */
import ICountryInformation from '@/ts/interfaces/CountryInformation';

/** STORE */
import { useCountryInformationStore } from '@/stores/useCountryInformationStore';

/** UTILS */
import numberWithSpaces from '@/utils/numberWithSpaces'

const mapFetchCountry = (countryDate: any, polishCountryName: string) => {
  const countryInformation: ICountryInformation = countryDate?.map(
    (country: any) => {
      const {
        capital,
        region,
        cca2,
        currencies,
        languages,
        flags,
        maps,
        population,
      } = country;

      const currenciesObject = countryDate[0]?.currencies &&
        currencies[Object.keys(countryDate[0]?.currencies)[0]];
      const languageObject = countryDate[0]?.languages &&
        languages[Object.keys(countryDate[0]?.languages)[0]];

      const currencyRate = countryDate[0]?.currencies &&
        useCountryInformationStore().$state.exchangeRates.find(
          (rate) => rate.code === Object.keys(countryDate[0].currencies)[0]
        )?.mid;

      const countryInfo: ICountryInformation = {
        polishCountryName: {
          polishName: 'Nazwa',
          value: polishCountryName,
        },
        id: {
          polishName: 'Kod',
          value: cca2,
        },
        imageFlag: {
          polishName: 'Flaga',
          value: flags.png,
          alt: flags.alt,
        },
        capital: {
          polishName: 'Stolica',
          value: capital && capital[0],
        },
        googleMapsLink: {
          polishName: 'Link do mapy',
          value: maps.googleMaps,
        },
        region: {
          polishName: 'Leży na kontynęcie',
          value: region,
        },
        currencyName: {
          polishName: 'Nazwa waluty',
          value: currenciesObject?.name,
        },
        currencySymbol: {
          polishName: 'Symbol waluty',
          value: currenciesObject?.symbol,
        },
        currencyRate: undefined,
        language: {
          polishName: 'Język',
          value: languageObject,
        },
        population: {
          polishName: 'Populacja',
          value: numberWithSpaces(population),
        },
      };

      if (cca2 === 'PL' || !currencyRate) return countryInfo;

      countryInfo.currencyRate = {
        polishName: 'Aktualny Kurs',
        value: `${currencyRate} zł`,
      };

      return countryInfo;
    }
  )[0];

  return countryInformation;
};

export default mapFetchCountry;
