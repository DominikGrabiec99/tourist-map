<template>
  <div
    :class="[
      'input-filed',
      {
        disabled: isFieldDisabled,
        valid: success,
        invalid: error,
        focused,
      },
    ]"
  >
    <label
      v-if="label"
      :for="name"
      class="input-label text-gray-500 font-bold cursor-pointer"
    >
      <span v-if="isRequireStar" class="text-red-700">*</span>
      {{ label }}
      <slot name="afterLabel" />
      <span v-if="isOptional" class="text-sm font-normal">(opcjonalne)</span>
    </label>
    <div class="input-container">
      <span
        v-if="placeholderExternal"
        ref="placeholderExternalRef"
        class="placeholder-external"
        @click="onFocus"
        >{{ placeholder }}</span
      >
      <div class="input-filed-wrapper relative">
        <input
          :id="id"
          ref="inputRef"
          class="w-full p-1 outline-none rounded-sm border border-gray-200"
          :type="type"
          :name="name"
          :value="modelValue"
          :pattern="pattern || ''"
          :aria-label="arialLabel"
          :placeholder="placeholderComputed"
          :disabled="isFieldDisabled || false"
          :class="[
            {
              'bg-neutral-300': isFieldDisabled || false,
              'border-red-600': error && !focused,
              'pl-8': icon && iconPlacement === 'left',
              'valid pr-9 border-green-600': success && !isFieldDisabled,
            },
          ]"
          autocomplete="off"
          :maxlength="maxValueLength"
          :minlength="minValueLength"
          @input.prevent="recheck($event)"
          @keydown="checkChar($event)"
          @keyup.enter="onEnter"
          @focus="onFocus"
          @blur="onBlur"
        />
        <Icon
          v-if="icon"
          :name="icon"
          size="30"
          id="input-filed-icon"
          class="input-filed-icon icon p-2 bg-slate-400 text-gray-100 h-full absolute top-1/2 -translate-y-1/2 rounded-tl-sm rounded-bl-sm"
          :class="{
            'left-px': iconPlacement === 'left',
            '!bg-green-600': success && !isFieldDisabled,
            '!bg-red-600': error && !focused && !isFieldDisabled,
          }"
          @click="$emit('icon-clicked', icon)"
        />
        <Icon
          v-if="success"
          name="system-uicons:check"
          size="30"
          id="success-icon"
          class="icon icon--success font-bold bg-transparent text-green-600 absolute right-1 top-1/2 -translate-y-1/2"
          :class="{
            '!bg-neutral-300': isFieldDisabled,
          }"
          @click="$emit('icon-clicked', icon)"
        />
      </div>
      <span
        v-if="error && !focused"
        :key="error"
        class="error-msg text-red-600 text-xs leading-3"
        v-html="error"
      />
      <div v-if="showHelperMessage" class="mt-1">
        <span
          :key="helper"
          class="helper-msg text-xs cursor-pointer text-neutral-500 font-semibold"
          v-html="helper"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/** UTILS */
import { placeholderHelper } from '@/utils/placeholderHelper';
import { numberPattern } from '@/utils/validations/regexRules';

/** TYPES */
import TStringNumberNull from '@/ts/types/StringNumberNull';

const props = withDefaults(
  defineProps<{
    id: string;
    modelValue: string | number;
    name: string;
    error?: string;
    success?: boolean;
    label?: string;
    isRequireStar?: boolean | undefined;
    isOptional?: boolean | undefined;
    type?: string;
    helper?: string;
    disabledHelperMessageOnError?: boolean;
    mask?: string;
    processValueBeforeUpdate?: Function | null;
    minValueLength?: number;
    maxValueLength?: number;
    charactersToBlock?: string;
    allowedInputCharacters?: RegExp;
    isFieldDisabled?: boolean;
    placeholder?: string;
    placeholderExternal?: boolean;
    icon?: string;
    iconPlacement?: string;
    pattern?: string;
  }>(),
  {
    id: '',
    name: '',
    error: '',
    success: false,
    label: '',
    isRequireStar: undefined,
    isOptional: undefined,
    type: '',
    helper: '',
    disabledHelperMessageOnError: true,
    mask: '',
    processValueBeforeUpdate: null,
    minValueLength: 0,
    maxValueLength: 9999,
    charactersToBlock: '',
    allowedInputCharacters: undefined,
    isFieldDisabled: false,
    placeholder: '',
    placeholderExternal: false,
    icon: '',
    iconPlacement: 'right',
    pattern: '',
  }
);

const {
  label,
  name,
  modelValue,
  mask,
  placeholder,
  placeholderExternal,
  type,
  processValueBeforeUpdate,
  helper,
  disabledHelperMessageOnError,
  error,
  allowedInputCharacters,
  charactersToBlock,
} = toRefs(props);

const emit = defineEmits<{
  (e: 'update:modelValue', value: TStringNumberNull): void;
  (e: 'blur'): void;
  (e: 'input'): void;
  (e: 'focus'): void;
  (e: 'enter', event: Event): void;
  (e: 'icon-clicked', icon: string): void;
}>();

const inputRef: Ref<HTMLInputElement | null> = ref(null);
const placeholderExternalRef: Ref<HTMLSpanElement | null> = ref(null);

const focused = ref(false);

const { placeholderComputed } = placeholderHelper(
  placeholder,
  placeholderExternal,
  mask,
  focused,
  modelValue
);

const arialLabel: ComputedRef<string> = computed(() =>
  !label.value ? name.value : label.value
);

const recheck = (e: Event): void => {
  let { value }: { value: TStringNumberNull } = e!.target! as HTMLInputElement;
  if (type.value === 'number') {
    if (!value) {
      value = null;
    } else {
      value = Number(value);
    }
  }

  if (processValueBeforeUpdate.value) {
    value = processValueBeforeUpdate.value(value);
  }

  emit('update:modelValue', value);
};

const onBlur = (): void => {
  if(!inputRef.value?.value) {
    focused.value = false;
    return
  }
  (inputRef.value as HTMLInputElement).blur();
  focused.value = false;
  emit('blur');
};

const onFocus = (event: Event): void => {
  if (event?.target === placeholderExternalRef.value) {
    (inputRef.value as HTMLInputElement).focus();
  }
  focused.value = true;
  emit('focus');
};

const onEnter = (event: Event): void => {
  emit('enter', event);
};

const checkChar = (event: KeyboardEvent): void => {
  const { key, target } = event;

  const ctrlDown = event.ctrlKey || event.metaKey;

  if (ctrlDown && ['z', 'c', 'v', 'x', 'a'].includes(key)) {
    return;
  }

  const defaultAllowKey = [
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Backspace',
    'Delete',
    'Tab',
    'Shift',
    'Control',
  ];
  if (defaultAllowKey.includes(key)) {
    return;
  }
  let value = String((target as HTMLInputElement).value).trim();

  if (type.value === 'tel') {
    value = value.replaceAll(' ', '');
  }

  if ([...charactersToBlock.value].includes(key)) {
    event.preventDefault();
  }
  const isNumber = new RegExp(numberPattern).test(key);
  if (type.value === 'number' && !isNumber) {
    event.preventDefault();
  }

  if (
    allowedInputCharacters.value &&
    !new RegExp(allowedInputCharacters.value).test(key)
  ) {
    event.preventDefault();
  }
};

const showHelperMessage = computed(() => {
  if (disabledHelperMessageOnError.value) {
    return false;
  }
  return !error.value && !!helper.value;
});
</script>
