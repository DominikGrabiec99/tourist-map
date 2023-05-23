<template>
  <header
    class="w-full bg-gradient-to-r from-sky-400 to-pink-600 pb-px relative"
  >
    <div class="h-full w-full bg-white flex z-20 relative">
      <div
        class="w-full container px-4 mx-auto md:px-14 lg:px-20 drop-shadow-lg py-1 flex justify-between"
      >
        <slot name="left" />
        <slot name="middle" />
        <slot name="right" />
      </div>
    </div>
    <slot name="bottom" />
  </header>
</template>
