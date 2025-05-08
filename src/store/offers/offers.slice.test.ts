import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeCard } from '../../mock';
import { createAPI } from '../../services/api';
import { APIRoute } from '../../const/enum';
import { RootState } from '../type';
import { fetchOffers } from '../api-action';

describe('Acync actioins', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFERS: {
      offers: [],
      isLoadingOffers: false,
      isErrorConnectionOffers: false,
    }});
  });

  describe('fetchOffers slice', () => {
    it('should dispatch fetchOffers.pending and fetchOffers.fulfilled when server response 200', async () => {
      const mockOffers = [makeFakeCard(), makeFakeCard(false)];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const emmitedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emmitedActions);
      const loadOffersFulfilled = emmitedActions.at(1) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
      ]);

      expect(loadOffersFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch fetchOffers.pending and fetchOffers.rejected when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });
});
