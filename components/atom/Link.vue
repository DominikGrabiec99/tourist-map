<template>
  <a v-if="isGlobalLink" :href="href" :alt="altTex" :_blank="blank">
    <slot />
  </a>
  <NuxtLink v-else :to="href">
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  href?: string,
  altTex?: string,
  blank?: boolean,
}>(), {
  href: '',
  altTex:'',
  blank:  false,
})

const { href } = toRefs(props);

const isGlobalLink = computed(() => href.value.includes('http'));
</script>