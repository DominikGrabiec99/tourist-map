import countries from '@/constans/polish_name_country';
const findPolishCountryName = (id: string) => {
  if (!id) return '';
  return countries.find((country) => country.code === id)?.name_pl || '';
};

export default findPolishCountryName;
