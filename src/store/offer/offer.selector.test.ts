import { selectOffer, selectOfferLoading, selectErrorConnection } from './offer.selector';
import { NameSpace } from '../const';
import { OfferType } from '../../const/type';
import { State } from '../type';
import { makeFakeOffer } from '../../mocks/mocks';

describe('offer selectors', () => {
  const mockOffer: OfferType = makeFakeOffer();

  const state: State = {
    [NameSpace.Offer]: {
      offer: mockOffer,
      isLoadingOffer: false,
      isErrorConnectionOffer: false,
    },
  } as unknown as State;

  it('selectOffer should return the offer object', () => {
    expect(selectOffer(state)).toEqual(mockOffer);
  });

  it('selectOfferLoading should return isLoadingOffer boolean', () => {
    expect(selectOfferLoading(state)).toBe(false);
  });

  it('selectErrorConnection should return isErrorConnectionOffer boolean', () => {
    expect(selectErrorConnection(state)).toBe(false);
  });
});
