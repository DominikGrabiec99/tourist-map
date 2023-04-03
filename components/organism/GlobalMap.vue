<template>
  <AtomLoading v-if="isMapLoading" class="loading" />
  <div v-else id="chartdiv" :ref="(el) => emit('set-map', el)" />
</template>

<script lang="ts" setup>
const { isMapLoading } = defineProps({
  isMapLoading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['set-map']);
</script>

<style scoped lang="scss">
#chartdiv {
  width: 100%;
  height: 80vh;
  max-width: 100%;
}

.loading {
  height: 80vh;
}
</style>