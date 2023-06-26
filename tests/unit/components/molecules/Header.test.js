import { describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import Header from '@/components/molecule/Header.vue';

describe('Header.vue', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(Header, {
      slots: {
        left: '<div>Left</div>',
        middle: '<div>Middle</div>',
        right: '<div>Right</div>',
        bottom: '<div>Bottom</div>',
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('check slots create', () => {
    expect(wrapper.html()).toContain('Left');
    expect(wrapper.html()).toContain('Middle');
    expect(wrapper.html()).toContain('Right');
    expect(wrapper.html()).toContain('Bottom');
  });
});
