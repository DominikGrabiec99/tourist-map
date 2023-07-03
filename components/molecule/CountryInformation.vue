<template>
  <div>
    <template v-for="information in countryInformation">
      <div
        v-if="information?.value"
        class="odd:bg-white dark:odd:bg-black even:bg-slate-100 dark:even:bg-neutral-900 dark:text-white"
      >
        <div class="flex justify-between py-2 px-1">
          <AtomText :text="`${information.polishName}:`" />
          <AtomText
            :text="information.value"
            v-if="
              typeof information?.value === 'string' &&
              !['Flaga', 'Link do mapy'].includes(information.polishName)
            "
          />
          <AtomLink
            v-else-if="information.polishName === 'Link do mapy'"
            :href="(information.value as string)"
            :blank="true"
            class="underline text-blue-700"
          >
            Google Maps
          </AtomLink>
          <AtomImage
            v-else-if="information.polishName === 'Flaga'"
            class="w-8 border-x border-y border-black"
            :src="(information.value as string)"
            :altText="information.alt"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import ICountryInformation from '@/ts/interfaces/CountryInformation';

const props = defineProps<{
  countryInformation?: ICountryInformation;
}>();

const { countryInformation } = toRefs(props);
</script>
