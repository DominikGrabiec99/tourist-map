<template>
  <Icon
    :name="name"
    size="24"
    class="dark:text-white pl-1 cursor-pointer transition-color"
    @click="toggleLightMode"
  />
</template>

<script setup lang="ts">
import { useLightModeStore } from '@/stores/useLightModeStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import EPageLightMode from '@/ts/enums/PageLightMode';

const lightModeStore = useLightModeStore();

const { toggleLightMode } = lightModeStore;

const mode = {
  [EPageLightMode.DARK]: 'solar:sun-2-broken',
  [EPageLightMode.LIGHT]: 'solar:moon-broken',
}

const { getLightMode } = storeToRefs(lightModeStore);

const name = computed(() => mode[getLightMode.value])
</script>
