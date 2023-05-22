<template>
  <MoleculeHeader>
    <template #left>
      <AtomLink class="flex items-end" href="/">
        <AtomImage class="h-12" src="/favicon.png" alt-text="Tourist App" />
      </AtomLink>
    </template>
    <template #middle>
      <AtomIcon
        :icon="['fas', 'user']"
        class="flex justify-center items-end text-3xl px-2 cursor-pointer"
      />
    </template>
    <!-- TODO add v-if when user is login -->

    <template #right>
      <MoleculeMenuIcon
        :is-open-modal="isOpenModal"
        @click="toggleMobileMenu"
      />
    </template>
    <template #bottom>
      <Transition name="menu">
        <div
          v-if="isOpenModal"
          class="absolute z-30 bottom-0 left-0 translate-y-full w-full bg-white h-[calc(100vh-4rem)]"
        >
          menu options
        </div>
      </Transition>
    </template>
  </MoleculeHeader>
</template>

<script setup lang="ts">
const isOpenModal = ref(false);

const toggleMobileMenu = () => {
  isOpenModal.value = !isOpenModal.value;
};
</script>

<style lang="scss">
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.5s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
