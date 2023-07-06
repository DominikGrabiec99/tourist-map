import { describe, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';

import { useLightModeStore } from '@/stores/useLightModeStore';

import EPageLightMode from '@/ts/enums/PageLightMode';
import EStorage from '@/ts/enums/Storage';

import LightModeIcon from '@/components/molecule/LightModeIcon.vue';

describe('LightModeIcon.vue', () => {
  let wrapper;
  let lightModeStore;

  beforeAll(() => {
    setActivePinia(createPinia());
    wrapper = mount(LightModeIcon);
  });

  beforeEach(() => {
    lightModeStore = useLightModeStore();
  });

  afterEach(() => {
    lightModeStore.$reset();
    localStorage.clear();
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('check is light mode icon', () => {
    expect(wrapper.element.getAttribute('name')).toStrictEqual(
      'solar:moon-broken'
    );
  });

  it('check toggle mode', async () => {
    lightModeStore.getLightModeFromStorage();
    lightModeStore.setLightModeOnPage();
    await wrapper.trigger('click');
    expect(lightModeStore.lightMode).toStrictEqual(EPageLightMode.DARK);
    await wrapper.trigger('click');
    expect(lightModeStore.lightMode).toStrictEqual(EPageLightMode.LIGHT);
  });

  it('check is dark mode icon', async () => {
    localStorage.setItem(EStorage.THEME, EPageLightMode.DARK);
    lightModeStore.getLightModeFromStorage();
    lightModeStore.setLightModeOnPage();
    expect(wrapper.element.getAttribute('name')).toStrictEqual(
      'solar:moon-broken'
    );
  });
});
