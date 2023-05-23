import ALL_COUNTRIES_WITH_POLISH_NAME from '@/constants/polish_name_countries';

export default defineNuxtRouteMiddleware((to) => {
  if (
    !ALL_COUNTRIES_WITH_POLISH_NAME.find((country) => country.code.toLowerCase() === to.params.id)
  ) {
    return navigateTo('/');
  }
});
