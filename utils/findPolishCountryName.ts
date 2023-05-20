import countries from '@/constants/polish_name_countries';
const findPolishCountryName = (id: string) => {
  if (!id) return '';
  return countries.find((country) => country.code === id)?.name_pl || '';
};

export default findPolishCountryName;
