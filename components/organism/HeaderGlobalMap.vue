<template>
  <div>
    <MoleculeSearchCountry
      v-model="localValue"
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
const emit = defineEmits([
  'update:modelValue',
  'set-select-country',
  'toggle-focus-input',
]);
const localValue = useModalWrapper(props, emit);
</script>
