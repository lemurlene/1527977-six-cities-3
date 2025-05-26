import { getState } from './utils';
import { AppRoute } from '../../const/enum';

describe('getState function', () => {
  it('returns correct classes for Favorites path', () => {
    const result = getState(AppRoute.Favorites);
    expect(result).toEqual({
      placeClassPrefix: ' favorites',
      addInfoClass: ' favorites__card-info',
      offerListClass: '',
    });
  });

  it('returns correct classes for Offer path', () => {
    const offerPath = '/offer/123';
    const result = getState(offerPath);
    expect(result).toEqual({
      placeClassPrefix: ' near-places',
      addInfoClass: '',
      offerListClass: ' near-places__list',
    });
  });

  it('returns correct classes for Root path', () => {
    const result = getState(AppRoute.Root);
    expect(result).toEqual({
      placeClassPrefix: ' cities',
      addInfoClass: '',
      offerListClass: ' cities__places-list tabs__content',
    });
  });

  it('returns default classes for unknown path', () => {
    const unknownPath = '/some/unknown/path';
    const result = getState(unknownPath);
    expect(result).toEqual({
      placeClassPrefix: ' cities',
      addInfoClass: '',
      offerListClass: ' cities__places-list tabs__content',
    });
  });
});
