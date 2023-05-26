<template>
  <div class="min-h-screen bg-white dark:bg-neutral-900 transition-color">
    <OrganismDefaultMobileHeader class="block md:hidden"/>
    <OrganismDefaultHeader class="hidden md:block"/>
    <div class="container mx-auto px-2">
      <slot />
    </div>
  </div>
</template>