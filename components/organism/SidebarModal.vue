<template>
  <div
    class="absolute top-0 left-0 w-full h-full bg-black-rgba-06"
    @click="(event) => closeModal(event)"
  >
    <div
      class="modal top-0 right-0 absolute h-screen bg-white w-full sm:max-w-md py-4 px-3"
      ref="modalRef"
    >
      <div class="button-container flex justify-end">
        <AtomIcon
          @click="(event) => closeModal(event)"
          class="close-modal bg-transparent text-2xl cursor-pointer text-gray-400"
          :icon="['fas', 'xmark']"
        />
      </div>
      <div
        class="modal-container"
        :class="{
          'modal-container--country':
            modalOptions.name === ESidebarModalName.COUNTRY,
        }"
      >
        <OrganismCountryModal
          v-if="modalOptions.name === ESidebarModalName.COUNTRY"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EProvideName from '@/ts/enums/ProvideName';
import ESidebarModalName from '@/ts/enums/SidebarModalName';
import IModalOptions from '@/ts/interfaces/ModalOptions';

const modalOptions: IModalOptions = inject(EProvideName.SIDEBAR_MODAL)!;

const modalRef = ref();

const closeModal = (element: any) => {
  if (element.target.className === modalRef.value?.className) return;
  modalOptions.isOpen = false;
  modalOptions.name = ESidebarModalName.NONE;
};
</script>
