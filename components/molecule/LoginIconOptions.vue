<template>
  <div
    v-for="option in loginOptions"
    :key="option.id"
    class="rounded-full border border-grey bg-white p-2 cursor-pointer"
    @click="option.loginFn"
  >
    <Icon :name="option.icon" size="25" :id="`login-option-${option.name}`" />
  </div>
</template>

<script setup lang="ts">
/** INTERFACES */
import ILoginOption from '@/ts/interfaces/LoginOption';

withDefaults(
  defineProps<{
    loginOptions: ILoginOption[];
  }>(),
  {
    loginOptions: () => [],
  }
);
</script>
