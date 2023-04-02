<template>
  <p>
    {{ text }}
  </p>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    defaul: '',
  },
});
</script>