import { mount } from '@vue/test-utils';
import { describe } from 'vitest';
import Title from '@/components/atom/Title.vue';

describe('Title.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(Title, {
      props: {
        content: 'Test title',
        tag: 'h2',
        bold: true,
      },
    });
  });

  it('render components', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render props.title', () => {
    expect(wrapper.text()).toContain('Test title');
  });

  it('render props.tag', () => {
    expect(wrapper.element.tagName).toBe('H2');
  });

  it('render props.bold', () => {
    expect(wrapper.classes()).toContain('font-bold');
  });
});
