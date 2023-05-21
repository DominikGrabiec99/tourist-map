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
        class="absolute bottom-0 right-0 w-full md:max-w-xs z-10 translate-y-full rounded-md border border-slate-300"
      >
        <AtomList
          listName="search-country-list"
          :list="foundedCounties"
          none
          li-class="bg-slate-100 odd:bg-slate-200"
        >
          <template v-slot="{ item }: { item: any }">
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

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  foundedCounties: {
    type: Array as PropType<IPolishCountryName[]>,
    default: [],
  },
  showResult: {
    type: Boolean,
    default: true,
  },
});

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