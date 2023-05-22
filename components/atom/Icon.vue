<template>
  <div class="icon-container">
    <font-awesome-icon :icon="icon" class="icon" />
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon: string[];
  }>(),
  {
    icon: () => [],
  }
);
</script>
