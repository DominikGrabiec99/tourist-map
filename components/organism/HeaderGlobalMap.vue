<template>
  <div class="block md:flex w-full justify-around">
    <AtomText 
      class="hidden md:flex items-center text-gray-700 text-xl font-bold"
      :text="title"
    />
    <MoleculeSearchCountry
      v-model="modelValue"
      :founded-counties="foundedCounties"
      :show-result="showResult"
      @set-select-country="$emit('setSelectCountry', $event)"
      @toggle-focus-input="$emit('toggle-focus-input', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import IPolishCountryName from '@/ts/interfaces/PolishCountryName';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  foundedCounties: {
    type: Array as PropType<IPolishCountryName[]>,
    default: [],
  },
  showResult: {
    type: Boolean,
    default: true,
  },
});

const modelValue = defineModel<string>();

const emit = defineEmits<{
  (e: 'toggle-focus-input', value: boolean): void;
  (e: 'set-select-country', value: string): void;
}>();

</script>
