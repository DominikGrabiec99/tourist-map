import countries from '@/constants/polish_name_countries';

export default defineNuxtRouteMiddleware((to) => {
  if (
    !countries.find((country) => country.code.toLowerCase() === to.params.id)
  ) {
    return navigateTo('/');
  }
});
