<template>
  <div class="md:max-w-xs">
    <label
      v-if="label"
      :for="id"
      class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
      :class="{
        'after:content-[]': !isRequire,
      }"
      >{{ label }}</label
    >
    <input
      :name="name"
      v-model="modelValue"
      :placeholder="placeholder"
      :id="id"
      :type="type"
      :disabled="disabled"
      :pattern="pattern"
      autocomplete="off"
      :class="{ 'border-red-500': error }"
      class="placeholder:italic placeholder:text-slate-400 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
      @focus="emit('toggle-focus-input', true)"
      @blur="emit('toggle-focus-input', false)"
    />
    <label class="block text-sm font-medium text-red-500">
      {{ error }}
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  isRequire: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  pattern: {
    type: String,
    default: '',
  },
});

const modelValue =  defineModel<string>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'toggle-focus-input', value: boolean): void;
}>();
</script>
