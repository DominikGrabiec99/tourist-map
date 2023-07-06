import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from '@/components/atom/Input.vue';

describe('Input.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Input, {
      propsData: {
        label: 'Test Label',
        placeholder: 'Test placeholder',
        error: 'Test error',
        modelValue: 'Test Value',
        isRequire: true,
        'onUpdate:modelValue': (e) =>
          wrapper.setProps({
            modelValue: e,
          }),
      },
    });
  });

  it('render component', () => {
    expect(wrapper.vm.modelValue).toBe('Test Value');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('emits input value when changed', async () => {
    const input = wrapper.get('[data-test="input"]');
    await input.setValue('New Test Value');
    expect(wrapper.props('modelValue')).toContain('New Test Value');
  });

  it('check label render', () => {
    expect(wrapper.get('[data-test="input-label"]').text()).toContain(
      'Test Label'
    );
  });

  it('check placeholder render', () => {
    expect(
      wrapper.get('[data-test="input"]').attributes('placeholder')
    ).toContain('Test placeholder');
  });

  it('check error render', () => {
    expect(wrapper.get('[data-test="input-error"]').text()).toContain(
      'Test error'
    );
    expect(wrapper.get('[data-test="input"]').classes()).toContain(
      'border-red-500'
    );
  });

  it('check required star', () => {
    expect(wrapper.get('[data-test="input-label"]').classes()).toContain(
      "after:content-['*']"
    );
  });

  it('check input is not required', () => {
    const wrapper = mount(Input, {
      props: {
        isRequire: false,
        label: 'Test Label',
      },
    });
    expect(wrapper.get('[data-test="input-label"]').classes()).toContain(
      'after:content-[]'
    );
  });

  it('check focus input', () => {
    const input = wrapper.find('input');
    wrapper.vm.$emit('toggle-focus-input', true);
    input.trigger('focus');
    expect(wrapper.emitted('toggle-focus-input')[0]).toEqual([true]);
  });
});
