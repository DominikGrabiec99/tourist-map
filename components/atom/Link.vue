<template>
  <a v-if="isGlobalLink" :href="href" :alt="altTex" :_blank="blank">
    <slot />
  </a>
  <NuxtLink v-else :to="href">
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
const { href } = defineProps({
  href: {
    type: String,
    default: '',
  },

  altTex: {
    type: String,
    default: '',
  },
  blank: {
    type: Boolean,
    default: false,
  },
});

const isGlobalLink = computed(() => href.includes('http'));
</script>