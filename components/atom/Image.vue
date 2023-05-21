<template>
  <img class="image" :src="src" :alt="altText" />
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    src?: string;
    altText?: string;
  }>(),
  {
    src: '',
    altText: 'Zdjęcie',
  }
);
</script>
