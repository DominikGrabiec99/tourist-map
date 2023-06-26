import { mount } from '@vue/test-utils';
import { describe } from 'vitest';
import Text from '@/components/atom/Text.vue';

describe('Title.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(Text, {
      props: {
        text: 'Test text',
      },
    });
  });

  it('render components', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render props.text', () => {
    expect(wrapper.text()).toContain('Test text');
  });
});
