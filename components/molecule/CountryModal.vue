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

const props = defineProps({
  pickedCountry: {
    type: Object as PropType<IPickedCountry>,
    default: {},
  },
  trips: {
    type: Array,
    default: [],
  },
});

const { pickedCountry } = toRefs(props);

defineEmits<{ (e: 'close-modal'): void }>();

const title = computed(
  () => `Wybrałeś państwo: ${findPolishCountryName(pickedCountry.value.id)}`
);
</script>
