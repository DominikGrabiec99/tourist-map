<template>{{ pickedCountry }}</template>

<script lang="ts" setup>
const { pickedCountry } = defineProps({
  pickedCountry: {
    type: Object,
    default: {},
  },
  closeModal: {
    type: Function,
    default: () => {},
  },
});
</script>