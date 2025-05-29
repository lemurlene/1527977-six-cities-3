import { selectFavoriteOffers, selectFavoriteOffersCount, selectFavoriteOffersLoading, selectUploadingFavoriteStatus } from './favorites.selector';
import { makeFakeStore, makeFakeCard } from '../../mocks/mocks';
import { NameSpace } from '../const';
import { LoadingStatus } from '../../const/enum';

describe('favorite selectors', () => {

  const sampleOffers = [
    makeFakeCard(),
    makeFakeCard(),
  ];

  const fakeState = makeFakeStore({
    [NameSpace.Favorite]: {
      favoriteOffers: sampleOffers,
      isFavoriteOffersLoading: false,
      uploadingFavoriteStatus: LoadingStatus.Idle,
    },
  });

  it('should select favorite offers list', () => {
    const result = selectFavoriteOffers(fakeState);
    expect(result).toEqual(sampleOffers);
  });

  it('should select correct count of favorite offers', () => {
    const result = selectFavoriteOffersCount(fakeState);
    expect(result).toBe(sampleOffers.length);
  });

  it('should select loading status of favorite offers', () => {
    const result = selectFavoriteOffersLoading(fakeState);
    expect(result).toBe(false);
  });

  it('should select uploading favorite status', () => {
    const result = selectUploadingFavoriteStatus(fakeState);
    expect(result).toBe(LoadingStatus.Idle);
  });

  const emptyState = makeFakeStore({
    [NameSpace.Favorite]: {
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      uploadingFavoriteStatus: LoadingStatus.Idle,
    },
  });

  it('should return 0 if favorite offers array is empty', () => {
    expect(selectFavoriteOffersCount(emptyState)).toBe(0);
  });
});
