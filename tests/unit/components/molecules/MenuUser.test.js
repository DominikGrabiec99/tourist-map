import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';

import MenuUser from '@/components/molecule/MenuUser.vue';
import Link from '@/components/atom/Link.vue';

describe('MenuUser.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(MenuUser, {
      props: {
        isUserMenuOpen: false,
      },
      components: {
        AtomLink: Link,
      },
    });
  });

  it('render component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('toggle user menu', async () => {
    wrapper.vm.$emit('toggle-user-menu', !wrapper.vm.isUserMenuOpen);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('toggle-user-menu')[0]).toEqual([true]);

    wrapper.find('icon').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('show menu options', async () => {
    const wrapper = mount(MenuUser, {
      props: {
        isUserMenuOpen: true,
        menuOptions: [
          {
            id: 1,
            link: '/test',
            text: 'menu-option',
          },
        ],
      },
      components: {
        AtomLink: Link,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.get('[data-test="option-container"]').html()).toContain(
      'menu-option'
    );
  });
});
