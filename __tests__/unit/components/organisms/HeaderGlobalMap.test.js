import { describe, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import HeaderGlobalMap from '@/components/organism/HeaderGlobalMap.vue';

describe('HeaderGlobalMap.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HeaderGlobalMap, {
      props: {
        title: 'test title',
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render props', () => {
    expect(wrapper.vm.title).toBe('test title');
    expect(wrapper.vm.showResult).toBeFalsy();
    expect(wrapper.vm.foundedCounties).toEqual([]);
  });

  it('test set-select-country', () => {
    wrapper.emitted('set-select-country');
    wrapper.vm.$emit('set-select-country', 'Pl');
    wrapper
      .find('[data-test="search-country"]')
      .trigger('set-select-country', 'Pl');
    expect(wrapper.emitted('set-select-country')).toHaveLength(2);
  });
});
