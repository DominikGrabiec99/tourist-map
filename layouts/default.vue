<template>
  <div class="min-h-screen bg-white dark:bg-neutral-900 transition-color flex flex-col">
    <OrganismHeaderMainCurrencies
      v-if="getMainCurrencies.length"
      :main-currencies="getMainCurrencies"
      :show-currency-view="showCurrencyView"
      @toggle-currency-view="toggleCurrencyView"
    />
    <OrganismDefaultMobileHeader class="block md:hidden" />
    <OrganismDefaultHeader class="hidden md:block" />
      <slot />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

/** STORE */
import { useCountryInformationStore } from '@/stores/useCountryInformationStore';

/** ENUMS */
import EStorage from '@/ts/enums/Storage';

const { getMainCurrencies } = storeToRefs(useCountryInformationStore());

const showCurrencyView = ref(true);

onMounted(() => {
  const sessionCurrencies = sessionStorage.getItem(EStorage.CURRENCIES);
  if (sessionCurrencies === 'true' || sessionCurrencies === null) {
    showCurrencyView.value = true;
  } else {
    showCurrencyView.value = false;
  }
  sessionStorage.setItem(EStorage.CURRENCIES, String(showCurrencyView.value));
});

const toggleCurrencyView = (value: boolean) => {
  showCurrencyView.value = value;
  sessionStorage.setItem(EStorage.CURRENCIES, String(showCurrencyView.value));
};
</script>
