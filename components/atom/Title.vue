<template>
  <component :is="tag">
    {{ content }}
  </component>
</template>

<script lang="ts" setup>
defineProps({
  content: {
    type: String,
    defaul: '',
  },
  tag: {
    type: String,
    defaul: '',
  },
});
</script>