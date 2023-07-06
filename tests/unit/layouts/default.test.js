import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';

import { createPinia, setActivePinia } from 'pinia';

import defaultLayout from '@/layouts/default.vue';

import EStorage from '@/ts/enums/Storage';

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

describe('defaultLayout', () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(defaultLayout);
  });

  afterEach(() => {
    sessionStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('render layout', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set currencies inStorage on mounted component', () => {
    expect(getItemSpy).toHaveBeenCalledWith(EStorage.CURRENCIES);
    expect(setItemSpy).toHaveBeenCalledWith(EStorage.CURRENCIES, 'true');
  });

  it('should toggle showCurrencyView', async () => {
    expect(wrapper.vm.showCurrencyView).toBeTruthy();
    expect(setItemSpy).toHaveBeenCalledWith(EStorage.CURRENCIES, 'true');
    await wrapper.vm.toggleCurrencyView(false);
    expect(wrapper.vm.showCurrencyView).toBeFalsy();
    expect(setItemSpy).toHaveBeenCalledWith(EStorage.CURRENCIES, 'false');
  });
});
