import countries from '@/constans/polish_name_country';

export default defineNuxtRouteMiddleware((to) => {
  if (
    !countries.find((country) => country.code.toLowerCase() === to.params.id)
  ) {
    return navigateTo('/');
  }
});
