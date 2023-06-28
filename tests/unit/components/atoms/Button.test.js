import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '@/components/atom/Button.vue';

describe('Button.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Button, {
      props: {
        text: 'Next',
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('render props.text', () => {
    const wrapper = mount(Button, {
      props: {
        text: 'Next',
      },
    });

    expect(wrapper.text()).toContain('Next');
  });

  it('should have secondary class', () => {
    const wrapper = mount(Button, {
      props: {
        secondary: true,
      },
    });

    expect(wrapper.get('[data-test="button"]').classes()).toContain(
      'bg-pink-600'
    );
  });

  it("shouldn't have secondary class", () => {
    const wrapper = mount(Button, {
      props: {
        secondary: false,
      },
    });

    expect(wrapper.get('[data-test="button"]').classes()).toContain(
      'bg-sky-400'
    );
  });

  it('check is button disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    expect(
      wrapper.get('[data-test="button"]').attributes('disabled')
    ).toBeTypeOf('string');
    expect(wrapper.get('[data-test="button"]').classes()).toContain(
      'cursor-default'
    );
  });

  it('trigger button', async () => {
    const wrapper = mount(Button);
    wrapper.vm.$emit('click');
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
