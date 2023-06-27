<template>
  <div class="block md:flex w-full justify-around">
    <AtomText 
      class="hidden md:flex items-center text-gray-700 text-xl font-bold"
      :text="title"
    />
    <MoleculeSearchCountry
      v-model="modelValue"
      :founded-counties="foundedCounties"
      @set-select-country="$emit('set-select-country', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import IPolishCountryName from '@/ts/interfaces/PolishCountryName';

const props = withDefaults(defineProps<{
  title?: string,
  foundedCounties?: IPolishCountryName[],
  showResult?: boolean,
}>(), {
  title: '',
  foundedCounties: () => ([]),
  showResult: false,
})

const modelValue = defineModel<string>();

const emit = defineEmits<{
  (e: 'set-select-country', value: string): void;
}>();

</script>
