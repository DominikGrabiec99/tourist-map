<template>
  <img class="image" :src="src" :alt="altText" />
</template>

<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    defaul: '',
  },
  altText: {
    type: String,
    default: 'Zdjęcie',
  },
});
</script>