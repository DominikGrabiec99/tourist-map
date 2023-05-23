<template>
  <div class="min-h-screen">
    <OrganismDefaultMobileHeader class="block md:hidden"/>
    <OrganismDefaultHeader class="hidden md:block"/>
    <div class="container mx-auto px-2">
      <slot />
    </div>
  </div>
</template>