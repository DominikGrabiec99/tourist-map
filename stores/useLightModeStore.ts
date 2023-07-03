import { defineStore } from 'pinia';

/** ENUMS */
import EPageLightMode from '@/ts/enums/PageLightMode';
import EStorage from '@/ts/enums/Storage';

/** UTILS */
import toggleBodyClass from '@/utils/toggleBodyClass';

interface IRootType {
  lightMode: EPageLightMode | string;
}

export const useLightModeStore = defineStore('lightMode', {
  state: (): IRootType => {
    return {
      lightMode: '',
    };
  },
  getters: {
    getLightMode: (state): EPageLightMode | string => {
      return state.lightMode || EPageLightMode.LIGHT;
    },
  },
  actions: {
    toggleLightMode(): void {
      if (process.server) return;
      if (this.lightMode === EPageLightMode.LIGHT) {
        this.lightMode = EPageLightMode.DARK;
      } else {
        this.lightMode = EPageLightMode.LIGHT;
      }
      this.setLightModeOnPage();
    },
    getLightModeFromStorage() {
      if (process.server) return;
      this.lightMode =
        localStorage.getItem(EStorage.THEME) || EPageLightMode.LIGHT;
    },
    setLightModeOnPage(): void {
      if (process.server) return;
      localStorage.setItem(EStorage.THEME, this.lightMode || '');
      if (this.lightMode === EPageLightMode.DARK) {
        toggleBodyClass('dark', true)
      } else {
        toggleBodyClass('dark', false)
      }
    },
  },
});
