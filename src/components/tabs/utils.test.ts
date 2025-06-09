import { describe, it, expect } from 'vitest';
import { getClassForNavLink } from './utils';

describe('getClassForNavLink', () => {
  it('returns the active class when isActive', () => {
    expect(getClassForNavLink({ isActive: true })).toBe(
      'tabs__item--active locations__item-link tabs__item'
    );
  });

  it('returns an inactive class when !isActive', () => {
    expect(getClassForNavLink({ isActive: false })).toBe(
      'locations__item-link tabs__item'
    );
  });
});
