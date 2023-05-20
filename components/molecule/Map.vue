<template>
  <div class="h-full w-full">
    <AtomLoading v-if="isMapLoading" class="loading" />
    <div
      v-else
      id="chartdiv"
      class="w-full max-h-full"
      :ref="(el) => emit('set-map', el)"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['set-map']);
const { isMapLoading } = defineProps({
  isMapLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
#chartdiv {
  height: 80vh;
}

.loading {
  height: 80vh;
}
</style>