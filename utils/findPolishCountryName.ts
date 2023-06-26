import ALL_COUNTRIES_WITH_POLISH_NAME from '@/constants/polish_name_countries';

const findPolishCountryName = (id: string) => {
  if (!id) return '';
  return ALL_COUNTRIES_WITH_POLISH_NAME.find((country) => country.code === id.toUpperCase())?.name_pl || '';
};

export default findPolishCountryName;
