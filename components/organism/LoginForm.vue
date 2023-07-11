<template>
  <div>
    <OrganismFormBoxInput
      v-for="field in formFields"
      v-bind="{ ...field, error: errors[field.name] || '' }"
      :is-field-disabled="isFieldsDisabled"
      :key="`login-form-${field.label}`"
      class="my-1"
      @correct-filed="$emit('correct-filed', field.name, $event)"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    formFields: any;
    errors: any;
    isFieldsDisabled: boolean;
  }>(),
  {
    formFields: () => ({}),
    errors: () => ({}),
    isFieldsDisabled: false,
  }
);

defineEmits<{
  (e: 'correct-filed', fieldName: string, value: any): void
}>();
</script>
