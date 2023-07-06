<template>
  <div class="currency-box flex flex-row">
    <template v-for="currency in sortedCurrencies" :key="currency.code">
      <MoleculeCurrencyInformation v-if="currency.mid" :currency="currency" />
    </template>
  </div>
</template>

<script setup lang="ts">
/** INTERFACES */
import IMainCurrency from '@/ts/interfaces/MainCurrency';

const { currencies = [] } = defineProps<{
  currencies : IMainCurrency[];
}>();

const sortedCurrencies = computed(() =>
  currencies.sort((currencyA, currencyB) =>
    currencyA.priority > currencyB.priority ? 1 : -1
  )
);
</script>

<style scoped lang="scss">
.currency-box {
  position: relative;
  animation: currencyRole 40s 0.5s linear infinite;
}
@keyframes currencyRole {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
