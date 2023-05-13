<template>
  <img class="image" :src="src" :alt="altText" />
</template>

<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    default: '',
  },
  altText: {
    type: String,
    default: 'Zdjęcie',
  },
});
</script>