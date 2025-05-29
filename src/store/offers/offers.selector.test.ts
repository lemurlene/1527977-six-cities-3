import { selectOffers, selectOffersLoading, selectErrorConnectionOffers } from './offers.selector';
import { NameSpace } from '../const';
import { makeFakeCard } from '../../mocks/mocks';
import { State } from '../type';

describe('Offers selectors', () => {
  const sampleOffers = [
    makeFakeCard(),
    makeFakeCard(),
  ];

  const mockState: State = {
    [NameSpace.Offers]: {
      offers: sampleOffers,
      isLoadingOffers: false,
      isErrorConnectionOffers: false,
    },
  } as unknown as State;

  it('selectOffers should return offers array', () => {
    expect(selectOffers(mockState)).toEqual(sampleOffers);
  });

  it('selectOffersLoading should return isLoadingOffers boolean', () => {
    expect(selectOffersLoading(mockState)).toBe(false);
  });

  it('selectErrorConnectionOffers should return isErrorConnectionOffers boolean', () => {
    expect(selectErrorConnectionOffers(mockState)).toBe(false);
  });
});
