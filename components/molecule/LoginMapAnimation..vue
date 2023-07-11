<template>
  <section class="flex justify-center items-center h-56 md:w-50 md:flex-grow">
    <div
      class="earth absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cover bg-repeat-x rounded-full h-52 md:h-64 md:w-64 w-52"
    >
      <div
        class="circle relative bg-opacity-30 dark:bg-transparent bg-white text-white text-xl font-bold top-1/2 text-center"
        style="transform: perspective(1000px)"
      >
        {{ text }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string;
  }>(),
  {
    text: 'Zaloguj się',
  }
);
</script>

<style lang="scss" scoped>
section {
  transform-style: preserve-3d;

  .earth {
    background: url('/images/world_map.jpg');
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1), 0 0 10px $darkBlue;
    animation: animationEarth 50s linear infinite;
  }

  .circle {
    transform-style: preserve-3d;
  }
}
</style>
