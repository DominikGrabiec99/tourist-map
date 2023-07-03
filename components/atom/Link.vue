<template>
  <a v-if="isGlobalLink" :href="href" :target="blank ? 'blank' : ''" data-test="html-link">
    <slot />
  </a>
  <NuxtLink v-else :to="href"  data-test="nuxt-link">
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  href: string,
  blank?: boolean,
}>(), {
  href: '',
  blank:  false,
})

const { href } = toRefs(props);

const isGlobalLink = computed(() => href.value.includes('http'));
</script>