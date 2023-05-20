export const useModalWrapper = (props: any, emit: any, name = 'modelValue') =>
computed({
  get: () => props[name],
  set: (newValue: any) => {
    emit(`update:${name}`, newValue);
  },
});
