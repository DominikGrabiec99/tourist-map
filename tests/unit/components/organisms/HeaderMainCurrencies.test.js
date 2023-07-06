import { describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import HeaderMainCurrencies from '@/components/organism/HeaderMainCurrencies.vue';

import { mainCurrencies } from '@/tests/mockData';

describe('HeaderMainCurrencies.vue', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(HeaderMainCurrencies, {
      props: {
        mainCurrencies,
        showCurrencyView: true,
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('check toggle emitted currency view', async () => {
    wrapper.vm.$emit('toggle-currency-view', !wrapper.vm.showCurrencyView);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('toggle-currency-view')[0]).toEqual([false]);

    wrapper.find('#currency-toggle-icon').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);

    wrapper.find('.currencies-box').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(2);
  });
});
