import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppThunkDispatch, extractActionsTypes, makeFakeCard } from '../mocks/mocks';
import createAPI from './api';
import { APIRoute } from '../const/enum';
import { RootState } from '../store/type';
import { fetchOffers } from '../store/api-action';

const mockProcessErrorHandle = vi.fn();

describe('Async API actions', () => {
  const axiosInstance = createAPI(mockProcessErrorHandle);
  const mockAxiosAdapter = new MockAdapter(axiosInstance);
  const middleware = [thunk.withExtraArgument(axiosInstance)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFERS: {
        offers: [],
        isLoadingOffers: false,
        isErrorConnectionOffers: false,
      }
    });
    vi.clearAllMocks();
  });

  describe('fetchOffers', () => {
    it('should dispatch "fetchOffers.pending" and "fetchOffers.fulfilled" with server response 200', async () => {
      const mockOffers = [makeFakeCard(), makeFakeCard()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const emittedActions = store.getActions();
      const actionTypes = extractActionsTypes(emittedActions);
      const fulfilledAction = emittedActions.at(1) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(actionTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type
      ]);

      expect(fulfilledAction.payload).toEqual(mockOffers);
      expect(mockProcessErrorHandle).not.toHaveBeenCalled();
    });

    it('should dispatch "fetchOffers.pending" and "fetchOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, { message: 'Bad Request' });

      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type
      ]);
      expect(mockProcessErrorHandle).toHaveBeenCalledWith('Bad Request');
    });

    it('should handle network error', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).networkError();

      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type
      ]);
      expect(mockProcessErrorHandle).not.toHaveBeenCalled();
    });
  });
});
