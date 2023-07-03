<template>
  <div
    class="absolute top-0 z-50 left-0 w-full min-h-screen bg-black-rgba-06 dark:bg-white-rgba-06 overflow-y-auto"
    @click="closeModal"
  >
    <div
      class="modal top-0 right-0 absolute min-h-screen bg-white dark:bg-neutral-900  w-full sm:max-w-md py-4 px-3 z-20"
      @click.stop=""
    >
      <div class="button-container flex justify-end">
        <AtomIcon
          @click="closeModal"
          class="close-modal bg-transparent text-2xl cursor-pointer text-gray-400"
          :icon="['fas', 'xmark']"
        />
      </div>
      <div
        class="modal-container"
        :class="{
          'modal-container--country':
            modalOptions?.name === ESidebarModalName.COUNTRY,
        }"
      >
        <OrganismCountryModal
          v-if="modalOptions?.name === ESidebarModalName.COUNTRY"
          v-bind="modalOptions.props"
          data-test="countryModal"
          @close-modal="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** ENUMS */
import EProvideName from '@/ts/enums/ProvideName';
import ESidebarModalName from '@/ts/enums/SidebarModalName';

/** INTERFACE */
import IModalOptions from '@/ts/interfaces/ModalOptions';

/** UTILS */
import toggleBodyClass from '@/utils/toggleBodyClass';

const modalOptions: IModalOptions = inject(EProvideName.SIDEBAR_MODAL)!;

const closeModal = () => {
  modalOptions.name = ESidebarModalName.NONE;
  if (modalOptions.props?.closeModal) {
    modalOptions.props?.closeModal();
  }
  modalOptions.isOpen = false;
  modalOptions.props = {};
};

onMounted(() => {
  toggleBodyClass('overflow-hidden', true)
})

onBeforeUnmount(() => {
  toggleBodyClass('overflow-hidden', false)
})
</script>
