<template>
  <component :is="tag" class="text-xl" :class="{ 'font-bold': bold }">
    {{ content }}
    <slot />
  </component>
</template>

<script lang="ts" setup>
const {
  content = '',
  tag = '',
  bold = true,
} = defineProps<{
  content?: string;
  tag?: string;
  bold?: boolean;
}>();
</script>
