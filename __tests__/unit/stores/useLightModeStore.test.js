import { describe, it, beforeAll, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLightModeStore } from '@/stores/useLightModeStore';
import EPageLightMode from '@/ts/enums/PageLightMode';
import EStorage from '@/ts/enums/Storage';

describe('useLightModeStore', () => {
  let lightModeStore;
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  beforeAll(() => {
    setActivePinia(createPinia());
  });

  beforeEach(() => {
    lightModeStore = useLightModeStore();
  });

  afterEach(() => {
    lightModeStore.$reset();
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('creates a store', () => {
    expect(lightModeStore).toBeDefined();
  });

  it('expect initial value', () => {
    expect(lightModeStore.getLightMode).toStrictEqual(EPageLightMode.LIGHT);
    expect(lightModeStore.lightMode).toStrictEqual('');
  });

  it('check value when app i mounted', () => {
    lightModeStore.getLightModeFromStorage();
    lightModeStore.setLightModeOnPage();
    expect(lightModeStore.lightMode).toStrictEqual(EPageLightMode.LIGHT);
  });

  it('check is lightMode save in localStorage', async () => {
    await lightModeStore.setLightModeOnPage();
    expect(setItemSpy).toHaveBeenCalledWith(
      EStorage.THEME,
      lightModeStore.lightMode
    );
  });

  it('check is lightMode get from localStorage', async () => {
    await lightModeStore.getLightModeFromStorage();
    expect(getItemSpy).toHaveBeenCalledWith(EStorage.THEME);
  });

  it('check is toggle lightMode', async () => {
    lightModeStore.getLightModeFromStorage();
    lightModeStore.setLightModeOnPage();
    expect(lightModeStore.lightMode).toStrictEqual(EPageLightMode.LIGHT);
    await lightModeStore.toggleLightMode();
    expect(lightModeStore.lightMode).toStrictEqual(EPageLightMode.DARK);
  });

  it('check is dark mode add to body', async () => {
    localStorage.setItem(EStorage.THEME, EPageLightMode.DARK);
    lightModeStore.getLightModeFromStorage();
    lightModeStore.setLightModeOnPage();
    expect(document.documentElement.getAttribute('class')).toContain('dark');
  });
});
