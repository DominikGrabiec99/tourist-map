import {
  describe,
  expect,
  it
} from 'vitest';
import {
  mount
} from '@vue/test-utils';
import Image from '../../../components/atom/Image.vue';

describe('Image.vue', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(Image, {
      props: {
        altText: 'Photo',
        src: '../../../public/favicon.png',
      },
    });
  });

  it('render image', () => {
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
    expect(wrapper.attributes('src')).toContain('../../../public/favicon.png');
    expect(wrapper.attributes('alt')).toContain('Photo');
  });
});