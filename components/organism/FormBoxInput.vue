<template>
  <div>
    <MoleculeFormInput
      v-model="value"
      :id="name"
      :key="`key-${name}`"
      :error="error"
      :helper="helper"
      :type="type"
      :class="`form-input-${name} mt-2`"
      :icon="icon"
      :name="`${name}`"
      :placeholder="placeholder"
      :placeholder-external="placeholderExternal"
      :icon-placement="iconPlacement"
      :pattern="pattern"
      :label="label"
      :is-require-star="isRequireStar"
      :is-optional="isOptional"
      :mask="mask"
      :success="isSuccess"
      :process-value-before-update="processValueBeforeUpdate"
      :min-value-length="minValueLength"
      :max-value-length="maxValueLength"
      :allowed-input-characters="allowedInputCharacters"
      :disabled-helper-message-on-error="disabledHelperMessageOnError"
      :is-field-disabled="isFieldDisabled"
      :characters-to-block="charactersToBlock"
      @update:modelValue="(value: any) => updateModelValue(value, `${name}`)"
      @blur="capitalizeInputFn"
    />
  </div>
</template>

<script setup lang="ts">
/** VEE-VALIDATE */
import { useField } from 'vee-validate';

/** INTERFACES */
import IFieldCorrection from '@/ts/interfaces/FieldCorrection';

/** UTILS */
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

const props = withDefaults(
  defineProps<{
    name?: string;
    error?: string;
    success?: boolean;
    label?: string;
    isRequireStar?: boolean | undefined;
    isOptional?: boolean | undefined;
    type?: string;
    helper?: string;
    mask?: string;
    processValueBeforeUpdate?: Function | null;
    disabledHelperMessageOnError?: boolean;
    minValueLength?: number;
    maxValueLength?: number;
    initialValue?: string;
    allowedInputCharacters?: RegExp;
    charactersToBlock?: string;
    capitalizeInput?: boolean;
    filedCorrection?: IFieldCorrection;
    isFieldDisabled?: boolean;
    placeholder?: string;
    placeholderExternal?: boolean;
    icon?: string;
    iconPlacement?: string;
    pattern?: string;
  }>(),
  {
    name: '',
    error: '',
    success: false,
    label: '',
    isRequireStar: undefined,
    isOptional: undefined,
    type: '',
    helper: '',
    mask: '',
    processValueBeforeUpdate: null,
    disabledHelperMessageOnError: true,
    minValueLength: 0,
    maxValueLength: 9999,
    initialValue: '',
    allowedInputCharacters: undefined,
    charactersToBlock: '',
    capitalizeInput: false,
    filedCorrection: {
      fieldName: '',
      showFieldCorrector: false,
      correctionFunction: undefined,
    },
    isFieldDisabled: false,
    placeholder: '',
    placeholderExternal: false,
    icon: '',
    iconPlacement: 'right',
    pattern: ''
  }
);

const emit = defineEmits<{
  (e: 'correct-filed', fieldName: string, value: any): void
}>();

const { isOptional, type, error, capitalizeInput, name, initialValue } = toRefs(props);

const { value, handleChange, setErrors } = useField<string| number>(name.value, undefined, {
  initialValue: initialValue.value,
  validateOnMount: !!initialValue.value
})

const capitalizeInputFn = () => {
  if(capitalizeInput.value && typeof value.value === 'string') {
    value.value = capitalizeFirstLetter(value.value)
  }
}

const isSuccess = computed(() => {
  const val = (type.value === 'number' ? String(value.value || '') : value.value) as string;

  const isOptionalNumberValid = isOptional.value && type.value === 'number' && val.length > 0;

  const noErrorAndValueIsEntered = !!(!error.value.length && val?.length);

  return noErrorAndValueIsEntered || isOptionalNumberValid;
})

const updateModelValue = (val: unknown, name: string) => {
  const newValue = String(val).trim();
  handleChange(newValue)
}

const removeFiledError = (fieldName: string, value: any) => {
  setErrors('');

  if(fieldName === 'email') {
    emit('correct-filed', fieldName, false)
    return;
  }

  emit('correct-filed', fieldName, value)
}

const correctFiled = (fieldName: string, value: any) => {
  emit('correct-filed', fieldName, value)
}
</script>
