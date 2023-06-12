<template>
  <button
    class="py-1 text-white cursor-pointer"
    data-test="button"
    :class="[
      secondary ? 'bg-pink-600 hover:bg-pink-700' : 'bg-sky-400 hover:bg-sky-500',
      disabled ? 'disabled:opacity-50 cursor-default' : '']"
    :disabled="disabled"
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
    disabled?: boolean;
  }>(),
  {
    text: '',
    secondary: false,
    buttonClass: '',
    disabled: false
  }
);

defineEmits<{
  (e: 'click'): void;
}>();
</script>
