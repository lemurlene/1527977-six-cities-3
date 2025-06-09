import { selectOffersNear, selectOffersNearLoading, selectErrorConnectionOffers } from './offers-near.selector';
import { NameSpace } from '../const';
import { State } from '../type';
import { makeFakeCard } from '../../mocks/mocks';

describe('OffersNear selectors', () => {
  const sampleOffers = [
    makeFakeCard(),
    makeFakeCard(),
  ];

  const mockState: State = {
    [NameSpace.OffersNear]: {
      offersNear: sampleOffers,
      isLoadingOffersNear: true,
      isErrorConnectionOffers: true,
    },
  } as unknown as State;

  it('selectOffersNear should return offersNear array', () => {
    expect(selectOffersNear(mockState)).toEqual(sampleOffers);
  });

  it('selectOffersNearLoading should return isLoadingOffersNear', () => {
    expect(selectOffersNearLoading(mockState)).toBe(true);
  });

  it('selectErrorConnectionOffers should return isErrorConnectionOffers', () => {
    expect(selectErrorConnectionOffers(mockState)).toBe(true);
  });
});
