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
withDefaults(
  defineProps<{
    text?: string;
    secondary?: boolean;
    buttonClass?: string;
  }>(),
  {
    text: '',
    secondary: false,
    buttonClass: '',
  }
);

defineEmits<{
  (e: 'click'): void;
}>();
</script>
