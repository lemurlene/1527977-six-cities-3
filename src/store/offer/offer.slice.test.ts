import { offerSlice, setErrorConnectionStatusOffer } from './offer.slice';
import { getOfferInfoById, changeFavoriteStatus } from '../api-action';
import { initialState } from './const';
import { makeFakeOffer } from '../../mocks/mocks';

describe('offer slice reducer', () => {
  it('should return initial state when passed an empty action', () => {
    const action = { type: '' };
    const result = offerSlice.reducer(undefined, action);
    expect(result).toEqual(initialState);
  });

  it('should handle setErrorConnectionStatusOffer action', () => {
    const action = setErrorConnectionStatusOffer(true);
    const result = offerSlice.reducer(initialState, action);
    expect(result.isErrorConnectionOffer).toBe(true);
  });

  describe('extraReducers for getOfferInfoById', () => {
    it('should set isLoadingOffer to true on pending', () => {
      const action = { type: getOfferInfoById.pending.type };
      const result = offerSlice.reducer(initialState, action);
      expect(result.isLoadingOffer).toBe(true);
    });

    it('should set isLoadingOffer to false and isErrorConnectionOffer to false on rejected', () => {
      const previousState = { ...initialState, isLoadingOffer: true, isErrorConnectionOffer: true };
      const action = { type: getOfferInfoById.rejected.type };
      const result = offerSlice.reducer(previousState, action);
      expect(result.isLoadingOffer).toBe(false);
      expect(result.isErrorConnectionOffer).toBe(false);
    });

    it('should set offer and isLoadingOffer false on fulfilled', () => {
      const fakeOffer = makeFakeOffer();
      const previousState = { ...initialState, isLoadingOffer: true };
      const action = {
        type: getOfferInfoById.fulfilled.type,
        payload: fakeOffer,
      };
      const result = offerSlice.reducer(previousState, action);
      expect(result.offer).toEqual(fakeOffer);
      expect(result.isLoadingOffer).toBe(false);
    });
  });

  describe('extraReducers for changeFavoriteStatus', () => {
    it('should update isFavorite on matching offer id', () => {
      const fakeOffer = makeFakeOffer({ isFavorite: false });
      const previousState = { ...initialState, offer: { ...fakeOffer } };

      const action = {
        type: changeFavoriteStatus.fulfilled.type,
        payload: { id: fakeOffer.id, isFavorite: true },
      };

      const result = offerSlice.reducer(previousState, action);
      expect(result.offer?.isFavorite).toBe(true);
    });

    it('should not update isFavorite if offer id does not match', () => {
      const fakeOffer = makeFakeOffer({ isFavorite: false });
      const previousState = { ...initialState, offer: fakeOffer };

      const action = {
        type: changeFavoriteStatus.fulfilled.type,
        payload: { isFavorite: true },
      };

      const result = offerSlice.reducer(previousState, action);
      expect(result.offer?.isFavorite).toBe(false);
    });
  });
});
