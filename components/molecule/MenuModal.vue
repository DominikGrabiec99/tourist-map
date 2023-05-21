<template>
  <MoleculeMenuOptions :user="user"/>
</template>

<script setup lang="ts">
const { user: undefined } = defineProps<{ user?: Object }>();
</script>