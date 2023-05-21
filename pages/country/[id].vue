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

const map = ref<Element>();

const route = useRoute();

const countryMap = useCountryMap();

// @ts-ignore
const { isMapLoading } = storeToRefs(countryMap);

const { init } = countryMap;

onMounted(() => {
  if (!map.value) return;
  init(map.value, route.params?.id.toString() || '');
});

const setMap = (vMap: Element) => {
  map.value = vMap;
};
</script>

function definePageMeta(arg0: { middleware: string; }) {
  throw new Error('Function not implemented.');
}
