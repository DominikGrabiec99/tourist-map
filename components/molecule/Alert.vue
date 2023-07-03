<template>
  <div class="alert flex w-full p-2 rounded-sm" :class="{'border-solid border-0 border-b-2': showBorderBottom}">
    <div>
      <Icon
        :name="icon"
        size="50"
        id="alert-icon"
        class="alert-icon pr-2"
        data-test="icon-open-user-menu"
        @click="$emit('toggle-user-menu', !isUserMenuOpen)"
      />
    </div>
    <div class="flex flex-col w-full">
      <AtomTitle tag="h4" :content="title" class="alert-title text-base" />
      <AtomText class="alert-description text-sm mt-2">
        <span v-html="description" />
      </AtomText>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import EAlertType from '@/ts/enums/AlertType';

withDefaults(
  defineProps<{
    title: string;
    type: EAlertType;
    description?: string;
    icon?: string;
    showBorderBottom?: boolean
  }>(),
  {
    title: '',
    type: EAlertType.SUCCESS,
    description: '',
    icon: '',
    showBorderBottom: true
  }
);
</script>
