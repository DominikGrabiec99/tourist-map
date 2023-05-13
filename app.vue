<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Transition name="modal">
    <OrganismSidebarModal v-if="modalOptions.isOpen" />
  </Transition>
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>


