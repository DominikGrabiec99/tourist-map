<template>
  <AtomTitle :content="title" tag="h1" />

  <!-- TODO planned trips -->
  <AtomLink
    @click="$emit('close-modal')"
    :href="`/country/${pickedCountry.id.toLowerCase()}`"
    ><AtomButton>Wybierz</AtomButton></AtomLink
  >
</template>

<script lang="ts" setup>
//utils
import findPolishCountryName from '@/utils/findPolishCountryName';

//interfaces
import IPickedCountry from '@/ts/interfaces/PickedCountry';

const { pickedCountry } = defineProps({
  pickedCountry: {
    type: Object as PropType<IPickedCountry>,
    default: {},
  },
  trips: {
    type: Array,
    default: [],
  },
});

defineEmits(['close-modal']);

const title = computed(
  () => `Wybrałeś państwo: ${findPolishCountryName(pickedCountry.id)}`
);
</script>
