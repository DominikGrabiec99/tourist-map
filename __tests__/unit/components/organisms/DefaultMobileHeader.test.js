import { describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import DefaultMobileHeader from '@/components/organism/DefaultMobileHeader.vue';

describe('DefaultMobileHeader.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DefaultMobileHeader);
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('toggle isUserMenuOpen', () => {
    expect(wrapper.vm.isUserMenuOpen).toBeFalsy();
    wrapper.vm.toggleUserMenu(true);
    expect(wrapper.vm.isUserMenuOpen).toBeTruthy();
  });

  it('toggle isOpenMenu', () => {
    expect(wrapper.vm.isOpenMenu).toBeFalsy();
    wrapper.vm.toggleMenu();
    expect(wrapper.vm.isOpenMenu).toBeTruthy();
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
