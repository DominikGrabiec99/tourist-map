<template>
  <div
    class="absolute top-0 left-0 w-full h-full bg-black-rgba-06"
    @click="closeModal()"
  >
    <div
      class="modal top-0 right-0 absolute h-screen bg-white w-full sm:max-w-md py-4 px-3 z-20"
      @click.stop=""
    >
      <div class="button-container flex justify-end">
        <AtomIcon
          @click="closeModal()"
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
        <MoleculeCountryModal
          v-if="modalOptions.name === ESidebarModalName.COUNTRY"
          v-bind="modalOptions.props"
          @close-modal="closeModal"
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

const closeModal = () => {
  modalOptions.name = ESidebarModalName.NONE;
  if (modalOptions.props?.closeModal) {
    modalOptions.props.closeModal();
  }
  modalOptions.isOpen = false;
  modalOptions.props = {};
};
</script>
