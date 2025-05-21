import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import useGroupedOffers from './';
import { makeFakeCard } from '../../mocks/mocks';
import { State } from '../../store/type';
import { LoadingStatus } from '../../const/enum';
import rootReducer from '../../store/root-reducer';

describe('Hook: useGroupedOffers', () => {
  it('should group offers by city name', () => {
    const parisOffer = makeFakeCard({ cityKey: 'Paris' });
    const anotherParisOffer = makeFakeCard({ cityKey: 'Paris' });
    const cologneOffer = makeFakeCard({ cityKey: 'Cologne' });

    const initialState: Partial<State> = {
      FAVORITE: {
        favoriteOffers: [parisOffer, anotherParisOffer, cologneOffer],
        isFavoriteOffersLoading: false,
        uploadingFavoriteStatus: LoadingStatus.Idle
      }
    };

    const store = createStore(rootReducer, initialState);

    const { result } = renderHook(() => useGroupedOffers(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(Object.keys(result.current)).toEqual(['Paris', 'Cologne']);
    expect(result.current.Paris).toHaveLength(2);
    expect(result.current.Cologne).toHaveLength(1);
    expect(result.current.Paris).toContainEqual(parisOffer);
    expect(result.current.Paris).toContainEqual(anotherParisOffer);
    expect(result.current.Cologne).toContainEqual(cologneOffer);
  });

  it('should return empty object when no offers', () => {
    const initialState: Partial<State> = {
      FAVORITE: {
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        uploadingFavoriteStatus: LoadingStatus.Idle
      }
    };

    const store = createStore(rootReducer, initialState);

    const { result } = renderHook(() => useGroupedOffers(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual({});
  });
});
