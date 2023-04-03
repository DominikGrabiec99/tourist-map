<template>
  <div>
    <OrganismGlobalMap :isMapLoading="isMapLoading" @set-map="setMap" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import EProvideName from '@/ts/enums/ProvideName';
import ESidebarModalName from '@/ts/enums/SidebarModalName';
import IModalOptions from '@/ts/interfaces/ModalOptions';

const map = ref<HTMLElement>();

const globalMap = useGlobalMap();

// @ts-ignore
const { isMapLoading, pickedCountry } = storeToRefs(globalMap);

const modalOptions: IModalOptions = inject(EProvideName.SIDEBAR_MODAL)!;

const { init, selectCountry } = globalMap;

onMounted(() => {
  if (!map.value) return;
  init(map.value);
});

const openModal = () => {
  modalOptions.isOpen = true;
  modalOptions.name = ESidebarModalName.COUNTRY;
  modalOptions.props = {
    pickedCountry: pickedCountry,
    closeModal: () => selectCountry(''),
  };
};

const setMap = (vMap: HTMLElement) => {
  map.value = vMap;
};

watch(pickedCountry, () => {
  if (!pickedCountry.value) return;
  openModal();
});
</script>

<style scoped lang="scss">
#chartdiv {
  width: 100%;
  height: 80vh;
  max-width: 100%;
}
</style>
