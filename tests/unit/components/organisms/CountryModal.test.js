import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

import CountryModal from '@/components/organism/CountryModal.vue';
import Button from '@/components/atom/Button.vue';
import Title from '@/components/atom/Title.vue';
import Link from '@/components/atom/Link.vue';

import findPolishCountryName from '@/utils/findPolishCountryName';

import { useCountryInformationStore } from '@/stores/useCountryInformationStore';

const id = 'pl';
const notCorrectId = 'test';

const mockData = {
  capital: { polishName: 'Stolica', value: 'Warsaw' },
  currencyName: { polishName: 'Nazwa waluty', value: 'Polish złoty' },
  currencyRate: undefined,
  currencySymbol: { polishName: 'Symbol waluty', value: 'zł' },
  googleMapsLink: {
    polishName: 'Link do mapy',
    value: 'https://goo.gl/maps/gY9Xw4Sf4415P4949',
  },
  id: { polishName: 'Kod', value: 'PL' },
  imageFlag: {
    polishName: 'Flaga',
    value: 'https://flagcdn.com/w320/pl.png',
    alt: 'The flag of Poland is composed of two equal horizontal bands of white and red.',
  },
  language: { polishName: 'Język', value: 'Polish' },
  polishCountryName: { polishName: 'Nazwa', value: 'Polska' },
  population: { polishName: 'Populacja', value: '37 950 802' },
  region: { polishName: 'Leży na kontynęcie', value: 'Europe' },
};

describe('CountryModal.vue', () => {
  let wrapper;
  let countryInformationStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(CountryModal, {
      props: {
        pickedCountry: {
          id,
        },
      },
      components: {
        AtomButton: Button,
        AtomTitle: Title,
        AtomLink: Link,
      },
    });
  });

  beforeEach(() => {
    countryInformationStore = useCountryInformationStore();
  });

  afterEach(() => {
    countryInformationStore.$reset();
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render title', async () => {
    const countryName = findPolishCountryName(wrapper.props().pickedCountry.id);
    await wrapper.vm.fetchCountry();
    expect(wrapper.vm.title).toContain(countryName);
    expect(wrapper.text()).toContain(countryName);
  });

  it('check link to country page', async () => {
    await wrapper.vm.fetchCountry();
    expect(
      wrapper.get('[data-test="link"]').element.getAttribute('to')
    ).toContain(`country/${id}`);
  });

  it('check loading country information', async () => {
    expect(wrapper.get('[data-test="loading"]').element).toBeDefined();
  });

  it('check country error', async () => {
    const wrapper = mount(CountryModal, {
      props: {
        pickedCountry: {
          id: notCorrectId,
        },
      },
    });
    await wrapper.vm.fetchCountry();
    expect(wrapper.get('[data-test="error"]').element).toBeDefined();
  });
});
