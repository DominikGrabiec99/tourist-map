<template>
  <MoleculeMenuOptions :user="user"/>
</template>

<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    default: undefined,
  },
});
</script>