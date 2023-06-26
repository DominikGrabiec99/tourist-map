import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Map from '@/components/molecule/Map.vue';
import Loading from '@/components/atom/Loading.vue';

describe('Map.vue', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(Map, {
      components: {
        AtomLoading: Loading,
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('check loading map', () => {
    const wrapper = mount(Map, {
      components: {
        AtomLoading: Loading,
      },
      props: {
        isMapLoading: true,
      },
    });
    expect(wrapper.get('.loading').element).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
