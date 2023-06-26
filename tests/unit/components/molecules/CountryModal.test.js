import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';

import CountryModal from '@/components/molecule/CountryModal.vue';
import Button from '@/components/atom/Button.vue';
import Title from '@/components/atom/Title.vue';
import Link from '@/components/atom/Link.vue';

import findPolishCountryName from '@/utils/findPolishCountryName';

const id = 'pl';

describe('CountryModal.vue', () => {
  let wrapper;
  beforeEach(() => {
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

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render title', () => {
    const countryName = findPolishCountryName(wrapper.props().pickedCountry.id);
    expect(wrapper.vm.title).toContain(countryName);
    expect(wrapper.text()).toContain(countryName);
  });

  it('check link to country page', () => {
    expect(
      wrapper.get('[data-test="link"]').element.getAttribute('to')
    ).toContain(`country/${id}`);
  });
});
