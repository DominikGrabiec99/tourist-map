<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Transition name="modal">
    <OrganismSidebarModal v-if="modalOptions.isOpen" />
  </Transition>
</template>

<script lang="ts" setup>
/** STORE */
import { useLightModeStore } from '@/stores/useLightModeStore';
import { useCountryInformationStore } from '@/stores/useCountryInformationStore';

/** ENUMS */
import ESidebarModalName from '@/ts/enums/SidebarModalName';
import EProvideName from '@/ts/enums/ProvideName';

const lightModeStore = useLightModeStore();

const { setLightModeOnPage, getLightModeFromStorage } = lightModeStore;

const { fetchPolishExchangeRates } = useCountryInformationStore();

const modalOptions = reactive({
  props: {},
  isOpen: false,
  name: ESidebarModalName.NONE,
});

provide(EProvideName.SIDEBAR_MODAL, modalOptions);

onMounted(() => {
  getLightModeFromStorage();
  setLightModeOnPage();
  fetchPolishExchangeRates();
});
</script>
