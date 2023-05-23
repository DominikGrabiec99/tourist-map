<template>
  <div
    class=" relative flex justify-center items-end text-3xl px-1 cursor-pointer z-20"
    id="user-menu"
  >
    <Icon
      name="codicon:account"
      size="24"
      id="user-menu"
      class="dark:text-white"
      @click="$emit('toggle-user-menu', !isUserMenuOpen)"
    />
    <Transition name="menu">
      <div
        v-if="isUserMenuOpen"
        class="absolute bottom-0 translate-y-full bg-white text-sm w-32 p-2 border-gray-300 border rounded flex flex-col z-40"
      >
        <div
          class="absolute w-0 h-0 top-0 left-1/2 -translate-y-full -translate-x-1/2 border-x-8 border-solid border-b-8 border-white border-x-transparent"
        />
        <AtomLink
          v-for="option in menuOptions"
          :key="option.id"
          :href="option.link"
          >{{ option.text }}</AtomLink
        >
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import IUserMenuOptions from '@/ts/interfaces/UserMenuOptions';

withDefaults(
  defineProps<{
    isUserMenuOpen: boolean;
    menuOptions: IUserMenuOptions[];
  }>(),
  {
    isUserMenuOpen: false,
    menuOptions: () => [],
  }
);

defineEmits<{
  (e: 'toggle-user-menu', value: boolean): void;
}>();
</script>
