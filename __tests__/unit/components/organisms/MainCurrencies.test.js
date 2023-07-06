import { describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import MainCurrencies from '@/components/organism/MainCurrencies.vue';

import { mainCurrencies } from '@/__tests__/mockData';

const sortedMainCurrencies = mainCurrencies.sort((currencyA, currencyB) =>
  currencyA.priority > currencyB.priority ? 1 : -1
);

describe('MainCurrencies.vue', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(MainCurrencies, {
      props: {
        currencies: mainCurrencies,
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('check sorted currencies', () => {
    expect(wrapper.vm.sortedCurrencies).toEqual(sortedMainCurrencies);
  });
});
