<template>
  <MoleculeHeader>
    <template #left>
      <MoleculeLogo />
    </template>
    <template #middle>
      <MoleculeMenuUser
        :is-user-menu-open="isUserMenuOpen"
        :menu-options="USER_MENU_LOGOUT_OPTIONS"
        @toggle-user-menu="toggleUserMenu"
      />
    </template>
    <template #right>
      <div class="flex items-end">
        <MoleculeMenuIcon :is-open-modal="isOpenMenu" @click="toggleMenu" class="mr-2" />
        <MoleculeLightModeIcon />
      </div>
    </template>
    <template #bottom>
      <Transition name="menu">
        <nav
          v-if="isOpenMenu"
          class="absolute z-10 bottom-0 left-0 translate-y-full w-full bg-white h-[calc(100vh-4rem)] flex flex-col items-center pt-4 dark:bg-neutral-900 transition-color"
        >
          <AtomLink
            v-for="option in MENU_OPTIONS"
            :key="option.id"
            :href="option.link"
            class="cursor-pointer text-lg text-sky-950 hover:text-sky-800 dark:text-sky-600 dark:hover:text-sky-500 mt-2 flex items-center transition-color"
            @click="toggleMenu"
          >
            <Icon v-if="option.icon" :name="option.icon" size="20" class="block" /><span
              class="pl-1"
              >{{ option.text }}
              </span>
          </AtomLink>
        </nav>
      </Transition>
    </template>
  </MoleculeHeader >
</template>

<script setup lang="ts">
import {
  USER_MENU_LOGOUT_OPTIONS,
  MENU_OPTIONS,
} from '@/constants/menuOptions';
const isOpenMenu = ref(false);
const isUserMenuOpen = ref(false);

const toggleMenu = () => {
  isOpenMenu.value = !isOpenMenu.value;
};

const toggleUserMenu = (value: boolean) => {
  isUserMenuOpen.value = value;
};

if (process.client) {
  document.body.addEventListener(
    'click',
    (event) => {
      //@ts-ignore
      if (event.target?.id === 'user-menu') return;
      toggleUserMenu(false);
    },
    true
  );
}
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
