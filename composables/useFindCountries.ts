import countries from '@/constants/polish_name_countries';
const useFindCountries = () => {
  const getFoundedCounties = (searchCountryValue: string, searchAfterTextLength: number) => {
    if(searchCountryValue.length < searchAfterTextLength) return [];
    return countries.filter((country) => country.name_pl.toLowerCase().includes(searchCountryValue.toLowerCase()))
  }
  
  return {
    getFoundedCounties
  }
}

export default useFindCountries;