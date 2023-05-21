<template>
  <p>
    {{ text }}
    <slot />
  </p>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: '',
  }
);
</script>
