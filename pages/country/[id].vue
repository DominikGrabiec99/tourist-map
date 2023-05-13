<template>
  <div>
    <MoleculeMap @set-map="setMap" :is-map-loading="isMapLoading" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

definePageMeta({
  middleware: 'country-exist',
});

const map = ref<HTMLElement>();

const route = useRoute();

const countrylMap = useCountryMap();

// @ts-ignore
const { isMapLoading } = storeToRefs(countrylMap);

const { init } = countrylMap;

onMounted(() => {
  if (!map.value) return;
  init(map.value, route.params?.id.toString() || '');
});

const setMap = (vMap: HTMLElement) => {
  map.value = vMap;
};
</script>
