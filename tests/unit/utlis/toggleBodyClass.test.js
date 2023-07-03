import { describe, it } from 'vitest';
import toggleBodyClass from '@/utils/toggleBodyClass.ts';

const className = 'body';

describe('toggleBodyClass', () => {
  it('check class add to body', () => {
    toggleBodyClass(className, true);
    expect(document.documentElement.getAttribute('class')).toContain(className);
  });

  it('check class remove from body', () => {
    document.documentElement.classList.add(className);
    toggleBodyClass(className, false);
    expect(document.documentElement.getAttribute('class')).not.toContain(
      className
    );
  });
});
