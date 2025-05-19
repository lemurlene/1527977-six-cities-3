import { LoadingStatus } from '../../const/enum';
import { fetchFavoriteOffers, changeFavoriteStatus } from '../api-action';
import { initialState } from './const';
import { makeFakeCard, makeFakeOffer } from '../../mocks/mocks';
import { favoritesSlice } from './favorites.slice';

const isFavorite = true;

describe('favorites slice', () => {
  const emptyAction = { type: '' };
  const mockCard = makeFakeCard();
  const mockOfferIsFavorite = makeFakeOffer(isFavorite);
  const mockOfferNotFavorite = makeFakeOffer(!isFavorite);

  it('should return initial state with empty action', () => {
    const expectedState = initialState;

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const expectedState = initialState;

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should isFavoriteOffersLoading true with fetchFavoriteOffers.pending', () => {
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersLoading: true,
      uploadingFavoriteStatus: LoadingStatus.Idle,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoriteOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should favoriteOffers to array with card, isFavoriteOffersLoading false with fetchFavoriteOffers.fulfilled', () => {
    const expectedState = {
      favoriteOffers: [mockCard],
      isFavoriteOffersLoading: false,
      uploadingFavoriteStatus: LoadingStatus.Idle,
    };

    const result = favoritesSlice.reducer(
      undefined,
      fetchFavoriteOffers.fulfilled([mockCard], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should isFavoriteOffersLoading false with fetchFavoriteOffers.rejected', () => {
    const expectedState = initialState;

    const result = favoritesSlice.reducer(undefined, fetchFavoriteOffers.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should uploadingFavoriteStatus Loading with changeFavoriteStatus.pending', () => {
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      uploadingFavoriteStatus: LoadingStatus.Loading,
    };

    const result = favoritesSlice.reducer(undefined, changeFavoriteStatus.pending);

    expect(result).toEqual(expectedState);
  });

  it('should uploadingFavoriteStatus Success and push card to favoriteOffers with changeFavoriteStatus.fulfilled', () => {
    const initialTestState = initialState;
    const expectedState = {
      favoriteOffers: [mockOfferIsFavorite],
      isFavoriteOffersLoading: false,
      uploadingFavoriteStatus: LoadingStatus.Success,
    };

    const result = favoritesSlice.reducer(
      initialTestState,
      changeFavoriteStatus.fulfilled(
        mockOfferIsFavorite, '', {offerId: mockOfferIsFavorite.id, isFavorite: mockOfferIsFavorite.isFavorite}
      ));

    expect(result).toEqual(expectedState);
  });

  it('should uploadingFavoriteStatus Success and remove card from favoriteOffers with changeFavoriteStatus.fulfilled', () => {
    const initialTestState = {
      favoriteOffers: [mockOfferNotFavorite],
      isFavoriteOffersLoading: false,
      uploadingFavoriteStatus: LoadingStatus.Idle,
    };
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      uploadingFavoriteStatus: LoadingStatus.Success,
    };

    const result = favoritesSlice.reducer(
      initialTestState,
      changeFavoriteStatus.fulfilled(
        mockOfferNotFavorite, '', {offerId: mockOfferNotFavorite.id, isFavorite: mockOfferNotFavorite.isFavorite}
      ));

    expect(result).toEqual(expectedState);
  });

  it('should uploadingFavoriteStatus Error with changeFavoriteStatus.rejected', () => {
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersLoading: false,
      uploadingFavoriteStatus: LoadingStatus.Error,
    };

    const result = favoritesSlice.reducer(
      undefined,
      changeFavoriteStatus.rejected);

    expect(result).toEqual(expectedState);
  });

});
