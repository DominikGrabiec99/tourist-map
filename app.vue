<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <OrganismSidebarModal v-if="modalOptions.isOpen" />
</template>

<script lang="ts" setup>
import ESidebarModalName from '@/ts/enums/SidebarModalName';
import EProvideName from '@/ts/enums/ProvideName';

const modalOptions = reactive({
  props: {},
  isOpen: false,
  name: ESidebarModalName.NONE,
});

provide(EProvideName.SIDEBAR_MODAL, modalOptions);
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
</style>


