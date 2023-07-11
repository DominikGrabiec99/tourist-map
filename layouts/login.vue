<template>
  <div
    class="min-h-screen bg-white dark:bg-neutral-900 transition-color flex flex-col"
  >
    <OrganismDefaultMobileHeader class="block md:hidden" />
    <OrganismDefaultHeader class="hidden md:block" />
    <div
      class="login-container w-full h-max flex-grow flex flex-column px-2 py-4 bg-slate-100 md:justify-center md:items-center"
    >
      <div
        class="rounded-xl w-full flex flex-grow flex-col md:flex-row bg-white px-5 py-1 md:h-2/3 md:justify-center md:items-center md:max-w-3xl md:py-8 md:px-10 border border-gray-100"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  @media (min-width: $tablet-min) {
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url('/images/map_view.png') no-repeat;
    background-size: cover;
  }
}
</style>
