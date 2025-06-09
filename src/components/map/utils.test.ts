import { describe, it, expect } from 'vitest';
import { getState } from './utils';
import { AppRoute } from '../../const/enum';

describe('getState', () => {
  it('should return "offer" prefix for offer page', () => {
    const result = getState(AppRoute.Offer);
    expect(result).toEqual({ rootClassPrefix: ' offer' });
  });

  it('should return "cities" prefix for other pages', () => {
    const result = getState(AppRoute.Root);
    expect(result).toEqual({ rootClassPrefix: ' cities' });
  });
});
