<template>
  <a v-if="isGlobalLink" :href="href" :_blank="blank">
    <slot />
  </a>
  <NuxtLink v-else :to="href">
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