<template>
  <header
    class="w-full bg-gradient-to-r from-sky-400 to-pink-600 pb-px relative h-16"
  >
    <div class="h-full w-full bg-white flex">
      <div
        class="w-full px-4 md:px-10 lg:px-20 py-2 drop-shadow-lg flex justify-between"
      >
        <slot name="left" />
        <slot name="middle" />
        <slot name="right" />
      </div>
    </div>
    <slot name="bottom" />
  </header>
</template>
