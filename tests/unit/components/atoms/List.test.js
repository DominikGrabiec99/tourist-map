import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import List from '@/components/atom/List.vue';

describe('List.vue', () => {
  let wrapper;
  let list;
  beforeAll(() => {
    wrapper = mount(List, {
      props: {
        listName: 'Test-list',
        list: ['test value 1', 'test value 2', 'test value 3'],
        enumerateList: true,
        none: true,
        liClass: '',
      },
    });

    list = wrapper.get('[data-test="list"]');
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render list elements', () => {
    expect(list.text()).toContain('test value 2');
    expect(list.text()).toContain('test value 3');
  });

  it('render props.enumerateList when true', () => {
    expect(list.element.tagName).toBe('OL');
  });

  it('render props.enumerateList when false', () => {
    const wrapper = mount(List, {
      props: {
        enumerateList: false,
      },
    });
    expect(wrapper.get('[data-test="list"]').element.tagName).toBe('UL');
  });

  it('render props.none', () => {
    expect(list.classes()).toContain('list-none');
  });
});
