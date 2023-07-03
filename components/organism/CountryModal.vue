<template>
  <div>
    <AtomLoading v-if="loading" data-test="loading" />
    <OrganismErrorAlert
      v-else-if="countryFetchError"
      data-test="error"
      class="mt-2"
    >
      <AtomButton
        class="button-error mt-5 px-2 py-2 rounded-sm mb-3 border-0 !bg-red-700 hover:!bg-red-600"
        @click="fetchCountry"
        >Spróbuj ponownie</AtomButton
      >
    </OrganismErrorAlert>
    <div v-else>
      <AtomTitle :content="title" tag="h1" class="dark:text-white" />
      <MoleculeCountryInformation class="mt-3" :country-information="country" />
      <div class="flex justify-end">
        <AtomLink
          @click="$emit('close-modal')"
          :href="`/country/${pickedCountry.id.toLowerCase()}`"
          data-test="link"
        >
          <AtomButton class="mt-5 px-3 py-2 rounded-sm mb-3"
            >Wybierz państwo</AtomButton
          >
        </AtomLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** UTILS */
import findPolishCountryName from '@/utils/findPolishCountryName';

/** STORE */
import { useCountryInformationStore } from '@/stores/useCountryInformationStore';

/** INTERFACES */
import IPickedCountry from '@/ts/interfaces/PickedCountry';
import ICountryInformation from '@/ts/interfaces/CountryInformation';

defineEmits<{ (e: 'close-modal'): void }>();

const { pickedCountry } = defineProps<{ pickedCountry: IPickedCountry }>();

const loading = ref(false);
const country = ref<ICountryInformation>();
const countryFetchError = ref(false);

const { fetchCountryById } = useCountryInformationStore();

const title = findPolishCountryName(pickedCountry.id || '');

const fetchCountry = async () => {
  countryFetchError.value = false;
  loading.value = true;
  try {
    const fetchedCountry = await fetchCountryById(pickedCountry.id, title);

    if (!fetchedCountry) {
      throw new Error(`Can't fetch country with id: ${pickedCountry.id}`);
    }
    country.value = fetchedCountry;
  } catch (err) {
    console.error('fetchCountry error', err);
    countryFetchError.value = true;
  }
  loading.value = false;
};

onMounted(() => {
  fetchCountry();
});
</script>

<style lang="scss" scoped>
.button-error {
  max-width: 200px;
}
</style>
