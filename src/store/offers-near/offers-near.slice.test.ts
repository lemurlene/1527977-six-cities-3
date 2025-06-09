import { offersNearSlice, setErrorConnectionStatusOffers } from './offers-near.slice';
import { fetchOffersNear, changeFavoriteStatus } from '../api-action';
import { makeFakeCard } from '../../mocks/mocks';

describe('offersNearSlice reducer', () => {
  const offer1 = makeFakeCard({ isFavorite: false, price: 100, rating: 4 });
  const offer2 = makeFakeCard({ isFavorite: true, price: 200, rating: 5 });

  const initialState = {
    offersNear: [offer1, offer2],
    isLoadingOffersNear: false,
    isErrorConnectionOffers: false,
  };

  it('should handle setErrorConnectionStatusOffers action', () => {
    const state = { ...initialState, isErrorConnectionOffers: false };
    const newState = offersNearSlice.reducer(state, setErrorConnectionStatusOffers(true));
    expect(newState.isErrorConnectionOffers).toBe(true);
  });

  it('should set isLoadingOffersNear true on fetchOffersNear.pending', () => {
    const action = { type: fetchOffersNear.pending.type };
    const result = offersNearSlice.reducer(initialState, action);
    expect(result.isLoadingOffersNear).toBe(true);
  });

  it('should set isLoadingOffersNear false on fetchOffersNear.rejected', () => {
    const state = { ...initialState, isLoadingOffersNear: true };
    const action = { type: fetchOffersNear.rejected.type };
    const result = offersNearSlice.reducer(state, action);
    expect(result.isLoadingOffersNear).toBe(false);
  });

  it('should set offersNear and isLoadingOffersNear false on fetchOffersNear.fulfilled', () => {
    const newOffers = [
      makeFakeCard({ isFavorite: false, price: 300 }),
    ];
    const state = { ...initialState, isLoadingOffersNear: true };
    const action = { type: fetchOffersNear.fulfilled.type, payload: newOffers };
    const result = offersNearSlice.reducer(state, action);
    expect(result.offersNear).toEqual(newOffers);
    expect(result.isLoadingOffersNear).toBe(false);
  });

  it('should update isFavorite in offersNear on changeFavoriteStatus.fulfilled', () => {
    const state = {
      ...initialState,
      offersNear: [
        { ...offer1, isFavorite: false },
        { ...offer2, isFavorite: true },
      ],
    };

    const action = {
      type: changeFavoriteStatus.fulfilled.type,
      payload: { id: offer1.id, isFavorite: true },
    };

    const result = offersNearSlice.reducer(state, action);
    const updatedOffer = result.offersNear.find((o) => o.id === offer1.id);
    expect(updatedOffer).toBeDefined();
    expect(updatedOffer?.isFavorite).toBe(true);
  });

  it('should not change offersNear if changeFavoriteStatus.fulfilled payload id not found', () => {
    const state = {
      ...initialState,
    };

    const action = {
      type: changeFavoriteStatus.fulfilled.type,
      payload: { id: 'non-existent-id', isFavorite: true },
    };

    const result = offersNearSlice.reducer(state, action);
    expect(result.offersNear).toEqual(state.offersNear);
  });
});
