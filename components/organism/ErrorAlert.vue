<template>
  <MoleculeAlert
    class="alert-box bg-red-300"
    :title="title"
    :type="EAlertType.ERROR"
    :icon="icon"
    :description="description"
    :showBorderBottom="showBorderBottom"
  >
    <slot />
  </MoleculeAlert>
</template>

<script setup lang="ts">
import EAlertType from '@/ts/enums/AlertType';
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    icon?: string;
    showBorderBottom?: boolean;
  }>(),
  {
    title: 'Coś poszło nie tak...',
    description: 'Wystąpił problem po naszej stronie. <br/> Spróbuj ponownie za chwilę lub odśwież stronę',
    icon: 'material-symbols:error-circle-rounded',
    showBorderBottom: true,
  }
);
</script>

<style scoped lang="scss">
.alert-box {
  border-color: $red-light;
}
:deep() {
  .alert {
    &-icon {
      color: $red-dark;
    }

    &-title {
      color: $red-dark;
    }
    &-description {
      color: $red-dark;
    }
  }
}
</style>
