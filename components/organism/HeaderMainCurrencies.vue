<template>
  <div
    class="currencies-header transition-color bg-gray-50 text-slate-900 dark:bg-neutral-900 dark:text-gray-200 py-1 relative"
    :class="{'cursor-pointer': !showCurrencyView}"
    @click.self="$emit('toggle-currency-view', true)"
  >
    <div
      class="currencies-box flex whitespace-nowrap container mx-auto px-4 md:px-1 lg:px-20 overflow-hidden"
      :class="{ hidden: !showCurrencyView }"
      @click="$emit('toggle-currency-view', true)"
    >
      <OrganismMainCurrencies :currencies="mainCurrencies" />
      <OrganismMainCurrencies :currencies="mainCurrencies" />
    </div>
    <Icon
      v-if="showCurrencyView"
      name="material-symbols:keyboard-double-arrow-up-rounded"
      size="20"
      id="currency-toggle-icon"
      class="absolute dark:text-white text-neutral-900 bg-white dark:bg-neutral-900 rounded-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 cursor-pointer !hidden"
      @click="$emit('toggle-currency-view', false)"
    />
  </div>
</template>

<script setup lang="ts">
/** INTERFACES */
import IMainCurrency from '@/ts/interfaces/MainCurrency';

const { mainCurrencies = [] } = defineProps<{
  mainCurrencies: IMainCurrency[];
  showCurrencyView: boolean;
}>();

defineEmits<{
  (e: 'toggle-currency-view', value: boolean): void;
}>();
</script>

<style lang="scss" scoped>
.currencies-header:hover #currency-toggle-icon {
  display: block !important;
}

.currencies-header:hover .currencies-box {
  display: flex;
}
</style>
