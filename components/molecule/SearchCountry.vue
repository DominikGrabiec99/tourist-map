<template>
  <div class="flex md:justify-end relative">
    <AtomInput
      v-model="modelValue"
      placeholder="Znajdź kraj.."
      id="find-country"
      class="w-full"
      @toggle-focus-input="emit('toggle-focus-input', $event)"
    />
    <Transition>
      <div
        v-if="showResult"
        class="absolute bottom-0 right-0 w-full md:max-w-xs z-10 translate-y-full rounded-md border border-slate-300 dark:border-white transition-color"
      >
        <AtomList
          listName="search-country-list"
          :list="foundedCounties"
          none
          li-class="bg-slate-100 odd:bg-slate-200 dark:text-white dark:bg-neutral-600 dark:odd:bg-neutral-700 transition-color"
        >
          <template v-slot="{ item }">
            <span
              class="py-2 px-2 w-full block cursor-pointer"
              @click="emit('set-select-country', item.code as string)"
            >
              <AtomImage
                :src="`https://flagcdn.com/16x12/${item.code.toLowerCase()}.png`"
                :altText="item.name_pl"
                class="pr-1 pb-1 inline"
              />
              {{ item.name_pl }}
            </span>
          </template>
        </AtomList>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import IPolishCountryName from '@/ts/interfaces/PolishCountryName';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    foundedCounties?: IPolishCountryName[];
    showResult?: boolean;
  }>(),
  {
    foundedCounties: () => [],
    showResult: true,
  }
);

const modelValue = defineModel<string>();

const emit = defineEmits<{
  (e: 'toggle-focus-input', value: boolean): void;
  (e: 'set-select-country', value: string): void;
}>();
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
