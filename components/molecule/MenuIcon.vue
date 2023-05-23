<template>
  <div
    class="flex justify-center items-center flex-col cursor-pointer hover:bg-slate-50 py-1 rounded"
  >
    <div
      class="w-6 bg-gray-300 h-1 rounded -translate-y-1/2"
      :class="{ '!translate-y-full rotate-45 ': isOpenModal }"
    />
    <div class="w-6 bg-gray-300 h-1 rounded" :class="{ '!w-0': isOpenModal }" />
    <div
      class="w-6 bg-gray-300 h-1 rounded translate-y-1/2"
      :class="{ '!-translate-y-full -rotate-45 ': isOpenModal }"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isOpenModal: boolean;
  }>(),
  {
    isOpenModal: false,
  }
);
</script>
