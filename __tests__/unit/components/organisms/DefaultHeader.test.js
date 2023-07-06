import { describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import DefaultHeader from '@/components/organism/DefaultHeader.vue';

describe('DefaultHeader.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DefaultHeader);
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('toggle isUserMenuOpen', () => {
    expect(wrapper.vm.isUserMenuOpen).toBeFalsy();
    wrapper.vm.toggleUserMenu(true);
    expect(wrapper.vm.isUserMenuOpen).toBeTruthy();
  });

  it('handle clickBodyEvent', () => {
    wrapper.vm.toggleUserMenu(true);
    wrapper.vm.clickBodyEvent({
      target: {
        id: 'user-menu',
      },
    });
    expect(wrapper.vm.isUserMenuOpen).toBeTruthy();
    wrapper.vm.clickBodyEvent({
      target: {
        id: 'test-id',
      },
    });
    expect(wrapper.vm.isUserMenuOpen).toBeFalsy();
  });
});
