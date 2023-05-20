<template>
  <div class="flex flex-col">
    <OrganismHeaderGlobalMap
      v-model="searchCountryValue"
      class="mt-2"
      title="Odkryj swój kierunek podróży"
      :founded-counties="foundedCounties"
      :show-result="showSearchCountryResult"
      @set-select-country="setSelectCountry"
      @toggle-focus-input="toggleFocusCountryInput"
    />
    <div class="flex h-full w-full">
      <!-- TODO Filters -->
      <div />
      <MoleculeMap :is-map-loading="isMapLoading" @set-map="setMap" />
    </div>
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

const searchCountryValue = ref('');
const isFocusSearchCountryInput = ref(false);

const { getFoundedCounties } = useFindCountries();
const foundedCounties = computed(() =>
  getFoundedCounties(searchCountryValue.value, 3)
);

const setSelectCountry = (id: string) => {
  searchCountryValue.value = '';
  selectCountry(id);
};

const toggleFocusCountryInput = (isFocus: boolean) => {
  isFocusSearchCountryInput.value = isFocus;
};

const showSearchCountryResult = computed(
  () => !!foundedCounties.value.length && isFocusSearchCountryInput.value
);
</script>
