import { describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import CurrencyInformation from '@/components/molecule/CurrencyInformation.vue';

const currency = {
  code: 'USD',
  symbol: '$',
  bgPositionX: '-19.32145em',
  bgPositionY: '-3.25em',
  name: 'dolar',
  mid: 4.1191,
  priority: 1,
};

describe('CurrencyInformation.vue', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(CurrencyInformation, {
      props: {
        currency,
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render props currency', () => {
    expect(wrapper.text()).toContain(currency.mid.toFixed(2));
  });
});
