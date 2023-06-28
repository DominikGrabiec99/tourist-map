import { describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import SidebarModal from '@/components/organism/SidebarModal.vue';

import ESidebarModalName from '@/ts/enums/SidebarModalName';

describe('SidebarModal.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SidebarModal, {
      global: {
        provide: {
          SIDEBAR_MODAl: {
            name: ESidebarModalName.COUNTRY,
            isOpen: true,
            props: {
              closeModal: () => {},
            },
          },
        },
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should close modal', () => {
    expect(wrapper.vm.modalOptions.isOpen).toBeTruthy();
    wrapper.vm.closeModal();
    expect(wrapper.vm.modalOptions.isOpen).toBeFalsy();
  });

  it('handle close modal button', () => {
    wrapper.find('.close-modal').trigger('click');
    expect(wrapper.vm.modalOptions.isOpen).toBeFalsy();
  });

  it('handle close modal by wrapper', () => {
    wrapper.trigger('click');
    expect(wrapper.vm.modalOptions.isOpen).toBeFalsy();
  });
});
