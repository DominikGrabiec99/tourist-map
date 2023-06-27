import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';

import SearchCountry from '@/components/molecule/SearchCountry.vue';
import Input from '@/components/atom/Input.vue';
import List from '@/components/atom/List.vue';
import Image from '@/components/atom/Image.vue';

import useFindCountries from '@/composables/useFindCountries.ts';

describe('SearchCountry', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchCountry, {
      propsData: {
        modelValue: '',
        foundedCounties: [],
      },
      components: {
        AtomInput: Input,
        AtomList: List,
        AtomImage: Image,
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('toggle isFocusSearchCountryInput', async () => {
    expect(wrapper.vm.isFocusSearchCountryInput).toBeFalsy();
    await wrapper.vm.toggleFocusCountryInput(
      !wrapper.vm.isFocusSearchCountryInput
    );
    expect(wrapper.vm.isFocusSearchCountryInput).toBeTruthy();
  });

  it('should open countries list', async () => {
    const { getFoundedCounties } = useFindCountries();
    await wrapper.setProps({
      modelValue: 'Pol',
      foundedCounties: getFoundedCounties('Pol', 3),
    });
    await wrapper.vm.toggleFocusCountryInput(
      !wrapper.vm.isFocusSearchCountryInput
    );
    expect(wrapper.vm.showResult).toBeTruthy();
    expect(wrapper.text()).toContain(getFoundedCounties('Pol', 3)[0].name_pl);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render image', async () => {
    const { getFoundedCounties } = useFindCountries();
    await wrapper.setProps({
      modelValue: 'Pol',
      foundedCounties: getFoundedCounties('Pol', 3),
    });
    await wrapper.vm.toggleFocusCountryInput(
      !wrapper.vm.isFocusSearchCountryInput
    );
    const imageCountry = wrapper.get(
      `[data-test="image-country-${getFoundedCounties('Pol', 3)[0].code}"]`
    );
    expect(imageCountry.element.getAttribute('src')).toBe(
      'https://flagcdn.com/16x12/pf.png'
    );
  });
});
