export const placeholderHelper = (
  placeholder: Ref<string>,
  placeholderExternal: Ref<boolean>,
  mask: Ref<string> = ref(''),
  focused: Ref<boolean>,
  value: Ref<string | number>
) => {
  const placeholderComputed: ComputedRef<string> = computed(() => {
    let placeholderComp = ref('');
    const maskAsPlaceholder = 
      placeholderExternal.value && typeof mask.value === 'string' && mask.value.length && focused.value && !value.value;
      if(maskAsPlaceholder) {
        placeholderComp.value = mask.value
      }

      if(!placeholderExternal.value) {
        placeholderComp.value = placeholder.value ? placeholder.value : mask.value
      }

      return placeholderComp.value
  })

  return {
    placeholderComputed
  }
};

