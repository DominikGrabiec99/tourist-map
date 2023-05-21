<template>
  <button
    class="py-1 text-white"
    :class="{
      'bg-pink-600 hover:bg-pink-700': secondary,
      ' bg-sky-400 hover:bg-sky-500': !secondary,
    }"
    @click="$emit('click')"
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
    default: false,
  },
  buttonClass: {
    type: String,
    default: '',
  },
});

defineEmits<{
  (e: 'click'): void;
}>();
</script>
