<template>
  <header class="w-full bg-gradient-to-r from-sky-400 to-pink-600 pb-px">
    <div class="h-full w-full bg-white flex">
      <div
        class="w-full px-4 md:px-10 lg:px-20 py-2 drop-shadow-lg flex justify-between"
      >
        <NuxtLink class="flex items-end" to="/">
          <AtomImage class="h-12" src="/favicon.png" alt-text="Tourist App" />
          <AtomTitle
            class="pl-1 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-pink-600"
            tag="h1"
            content="Tourist App"
          />
        </NuxtLink>
        <MoleculeMenuOptions :user="getUser" class="hidden md:flex items-end" />
        <div class="flex flex-col justify-center cursor-pointer md:hidden">
          <AtomButton class="bg-transparent hover:bg-transparent" @click="openModal">
            <div class="w-8 mb-1 bg-slate-300 h-1" />
            <div class="w-8 mb-1 bg-slate-300 h-1" />
            <div class="w-8 bg-slate-300 h-1" />
          </AtomButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';

import EProvideName from '@/ts/enums/ProvideName';
import ESidebarModalName from '@/ts/enums/SidebarModalName';
import IModalOptions from '@/ts/interfaces/ModalOptions';

const userStore = useUserStore();

const { getUser } = userStore;


const modalOptions: IModalOptions = inject(EProvideName.SIDEBAR_MODAL)!;

const openModal = () => {
  modalOptions.isOpen = true;
  modalOptions.name = ESidebarModalName.MENU;
};
</script>
