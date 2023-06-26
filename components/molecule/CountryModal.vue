<template>
  <AtomTitle :content="title" tag="h1" />

  <!-- TODO planned trips -->
  <AtomLink
    @click="$emit('close-modal')"
    :href="`/country/${pickedCountry.id.toLowerCase()}`"
    data-test="link"
  >
    <AtomButton>Wybierz</AtomButton>
  </AtomLink>
</template>

<script lang="ts" setup>
//utils
import findPolishCountryName from '@/utils/findPolishCountryName';

//interfaces
import IPickedCountry from '@/ts/interfaces/PickedCountry';

const { pickedCountry } = defineProps<{ pickedCountry: IPickedCountry }>();

defineEmits<{ (e: 'close-modal'): void }>();

const title = computed(
  () => `Wybrałeś państwo: ${findPolishCountryName(pickedCountry.id || '')}`
);
</script>
