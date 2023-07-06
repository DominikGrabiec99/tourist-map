import { describe, it, expect, beforeAll } from 'vitest';
import Icon from '@/components/atom/Icon.vue';
import { mount } from '@vue/test-utils';
describe('Icon.vue', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(Icon, {
      props: {
        icon: ['fas', 'xmark'],
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render icon', () => {
    expect(wrapper.get('.icon')).toBeTruthy();
  });
});
