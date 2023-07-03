import IPolishNameWithValue from '@/ts/interfaces/PolishNameWithValue';

interface ICountryInformation {
  polishCountryName?: IPolishNameWithValue<string>;
  id?: IPolishNameWithValue<string>;
  currencyName?: IPolishNameWithValue<string>;
  currencySymbol?: IPolishNameWithValue<string>;
  capital?: IPolishNameWithValue<string>;
  region?: IPolishNameWithValue<string>;
  language?: IPolishNameWithValue<string>;
  borders?: IPolishNameWithValue<string[]>;
  continents?: IPolishNameWithValue<string[]>;
  imageFlag?:  IPolishNameWithValue<string>;
  googleMapsLink?: IPolishNameWithValue<string>;
  population?: IPolishNameWithValue<string>;
  currencyRate?: IPolishNameWithValue<string>;
}

export default ICountryInformation;
