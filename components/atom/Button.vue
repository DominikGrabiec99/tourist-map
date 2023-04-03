<template>
  <button
    @click="$emit('click')"
    class="px-12 py-1 rounded-sm text-white bg-sky-400 hover:bg-sky-500"
    :class="{ 'bg-pink-600 hover:bg-pink-700': secondary }"
  >
    {{ text }}
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  secondary: {
    type: Boolean,
    default: true,
  },
});
defineEmits(['click']);
</script>