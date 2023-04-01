<template>
  <div id="chartdiv" ref="chartdiv" />
</template>

<script lang="ts" setup>
const chartdiv = ref<HTMLElement>();

const globalMap = useGlobalMap();

const { init } = globalMap;

onMounted(() => {
  if (!chartdiv.value) return;
  init(chartdiv.value);
});
</script>

<style scoped lang="scss">
#chartdiv {
  width: 100%;
  height: 80vh;
  max-width: 100%;
}
</style>
