<template>
  <component :is="tag" class="text-xl" :class="{ 'font-bold': bold }">
    {{ content }}
    <slot />
  </component>
</template>

<script lang="ts" setup>
defineProps({
  content: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'h1',
  },
  bold: {
    type: Boolean,
    default: true,
  },
});
</script>