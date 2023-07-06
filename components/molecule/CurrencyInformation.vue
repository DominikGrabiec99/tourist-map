<template>
  <div class="currency flex pl-3 items-center">
    <div
      class="flag-image text-2xl pr-3"
      :style="`--background-position-x-var: ${currency.bgPositionX}; --background-position-y-var: ${currency.bgPositionY};`"
    />
    <div class="flex flex-col">
      <span class="text-xs">Kurs {{ currency.symbol }}: </span>
      <span class="text-xs">{{ currency?.mid?.toFixed(2) }} zł</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/** INTERFACES */
import IMainCurrency from '@/ts/interfaces/MainCurrency';

defineProps<{
  currency: IMainCurrency;
}>();
</script>

<style scoped lang="scss">
.currency {
  min-width: 130px;
  .flag-image {
    &:after {
      content: '';
      background-position: var(--background-position-x-var)
        var(--background-position-y-var);
      background-image: url('/images/all_flags.svg');
      border-radius: 50%;
      width: 1em;
      height: 1em;
      transform: translateZ(0);
      display: block;
      background-size: 68.57143em 68.57143em;
      box-shadow: 0 0 0 2px $white;
    }
  }
}
</style>
