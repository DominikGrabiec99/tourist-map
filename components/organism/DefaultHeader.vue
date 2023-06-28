<template>
  <MoleculeHeader>
    <template #left>
      <MoleculeLogo />
    </template>
    <template #right>
      <div class="flex items-end">
        <nav class="flex items-end mr-4">
          <AtomLink
            v-for="option in MENU_OPTIONS"
            :key="option.id"
            :href="option.link"
            class="cursor-pointer text-lg text-sky-950 hover:text-sky-800 dark:text-sky-600 dark:hover:text-sky-500 mr-6 transition-color"
          >
            {{ option.text }}
          </AtomLink>
        </nav>
        <MoleculeMenuUser
          :is-user-menu-open="isUserMenuOpen"
          :menu-options="USER_MENU_LOGOUT_OPTIONS"
          @toggle-user-menu="toggleUserMenu"
        />
        <MoleculeLightModeIcon />
      </div>
    </template>
  </MoleculeHeader>
</template>

<script setup lang="ts">
import {
  USER_MENU_LOGOUT_OPTIONS,
  MENU_OPTIONS,
} from '@/constants/menuOptions';
const isUserMenuOpen = ref(false);

const toggleUserMenu = (value: boolean) => {
  isUserMenuOpen.value = value;
};

const clickBodyEvent = (event: MouseEvent) => {
  //@ts-ignore
  if (event.target?.id === 'user-menu') return;
  toggleUserMenu(false);
};

if (process.client) {
  document.body.addEventListener(
    'click',
    clickBodyEvent,
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
