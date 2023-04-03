<template>
  <p>
    {{ text }}
    <slot />
  </p>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
});
</script>