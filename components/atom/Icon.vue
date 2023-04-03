<template>
  <div class="icon-container">
    <font-awesome-icon :icon="icon" class="icon" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  icon: {
    type: Array as PropType<string[]>,
    default: [],
  },
});
</script>