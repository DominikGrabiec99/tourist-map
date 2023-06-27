import { describe, it, expect, beforeAll } from 'vitest';
import Link from '@/components/atom/Link.vue';
import { mount } from '@vue/test-utils';
describe('Icon.vue', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(Link, {
      props: {
        href: 'https://www.test.pl',
        blank: true,
      },
    });
  });

  it('should render "a" html element', () => {
    expect(wrapper.vm.isGlobalLink).toBeTruthy();
    const link = wrapper.get('[data-test="html-link"]');
    expect(link.element.getAttribute('_blank')).toBeTruthy();
    expect(link).toBeDefined();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render nuxtLink', () => {
    const wrapper = mount(Link, {
      props: {
        href: 'test-link',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.get('[data-test="nuxt-link"]')).toBeDefined();
  });
});
