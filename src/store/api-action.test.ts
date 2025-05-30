import { configureMockStore } from '@jedmao/redux-mock-store';
import createApi from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeCard, makeFakeReview, makeFakeOffer } from '../mocks/mocks';
import { State, AuthData } from './type';
import {
  fetchOffers,
  checkAuthorization,
  loginAction,
  logoutAction,
  getOfferInfoById,
  fetchOffersNear,
  fetchOfferComments,
  postOfferComment,
  fetchFavoriteOffers,
  changeFavoriteStatus
} from './api-action';
import { APIRoute } from '../const/enum';
import * as tokenStorage from '../services/token';

const mockProcessErrorHandle = vi.fn();

describe('Async actions', () => {
  const axios = createApi(mockProcessErrorHandle);
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFERS: {
        offers: [],
        isLoadingOffers: false,
        isErrorConnectionOffers: false,
      },
    });
  });

  describe('checkAuthorization', () => {
    it('should dispatch "checkAuthorization.pending" and "checkAuthorization.fulfilled" with thunk "checkAuthorization"', async () => {
      const fakeUser = { token: 'secret' };
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, fakeUser);

      await store.dispatch(checkAuthorization());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorization.pending.type,
        checkAuthorization.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthorization.pending" and "checkAuthorization.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthorization());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorization.pending.type,
        checkAuthorization.rejected.type,
      ]);
    });
  });

  describe('fetchOffers', () => {
    it('should dispatch "fetchOffers.pending", "fetchOffers.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeCard()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
      ]);

      expect(fetchOffersFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffers.pending", "fetchOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('getOfferInfoById', () => {
    it('should dispatch "getOfferInfoById.pending", "getOfferInfoById.fulfilled", when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(200, mockOffer);

      await store.dispatch(getOfferInfoById(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getOfferInfoByIdFulfilled = emittedActions.at(1) as ReturnType<typeof getOfferInfoById.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getOfferInfoById.pending.type,
        getOfferInfoById.fulfilled.type,
      ]);

      expect(getOfferInfoByIdFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "getOfferInfoById.pending", "getOfferInfoById.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(400, null);

      await store.dispatch(getOfferInfoById(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOfferInfoById.pending.type,
        getOfferInfoById.rejected.type,
      ]);
    });
  });

  describe('fetchOffersNear', () => {
    it('should dispatch "fetchOffersNear.pending", "fetchOffersNear.fulfilled", when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      const mockOffers = [makeFakeCard()];
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchOffersNear(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersNearFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersNear.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersNear.pending.type,
        fetchOffersNear.fulfilled.type,
      ]);

      expect(fetchOffersNearFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersNear.pending", "fetchOffersNear.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}/nearby`).reply(400, []);

      await store.dispatch(fetchOffersNear(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersNear.pending.type,
        fetchOffersNear.rejected.type,
      ]);
    });
  });

  describe('fetchOfferComments', () => {
    it('should dispatch "fetchOfferComments.pending", "fetchOfferComments.fulfilled", when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      const mockComments = [makeFakeReview()];
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOffer.id}`).reply(200, mockComments);

      await store.dispatch(fetchOfferComments(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferCommentsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferComments.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferComments.pending.type,
        fetchOfferComments.fulfilled.type,
      ]);

      expect(fetchOfferCommentsFulfilled.payload).toEqual(mockComments);
    });

    it('should dispatch "fetchOfferComments.pending", "fetchOfferComments.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOffer.id}`).reply(400, []);

      await store.dispatch(fetchOfferComments(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferComments.pending.type,
        fetchOfferComments.rejected.type,
      ]);
    });
  });

  describe('postOfferComment', () => {
    it('should dispatch "postOfferComment.pending", "postOfferComment.fulfilled", when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      const mockComment = makeFakeReview();
      const mockCommentData = {
        id: mockOffer.id,
        comment: {
          rating: mockComment.rating,
          review: mockComment.comment,
        },
      };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOffer.id}`).reply(200, mockComment);

      await store.dispatch(postOfferComment(mockCommentData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const postOfferCommentFulfilled = emittedActions.at(1) as ReturnType<typeof postOfferComment.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postOfferComment.pending.type,
        postOfferComment.fulfilled.type,
      ]);

      expect(postOfferCommentFulfilled.payload).toEqual(mockComment);
    });

    it('should dispatch "postOfferComment.pending", "postOfferComment.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      const mockComment = makeFakeReview();
      const mockCommentData = {
        id: mockOffer.id,
        comment: {
          rating: mockComment.rating,
          review: mockComment.comment,
        },
      };
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOffer.id}`).reply(400, null);

      await store.dispatch(postOfferComment(mockCommentData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOfferComment.pending.type,
        postOfferComment.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteOffers', () => {
    it('should dispatch "fetchFavoriteOffers.pending", "fetchFavoriteOffers.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeCard()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoriteOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteOffersFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchFavoriteOffers.pending", "fetchFavoriteOffers.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoriteOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatus', () => {
    it('should dispatch "changeFavoriteStatus.pending", "changeFavoriteStatus.fulfilled", when server response 200', async () => {
      const mockOffer = makeFakeOffer();
      const mockFavoriteData = {
        offerId: mockOffer.id,
        isFavorite: false,
      };
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockOffer.id}/${1}`).reply(200, mockOffer);

      await store.dispatch(changeFavoriteStatus(mockFavoriteData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const changeFavoriteStatusFulfilled = emittedActions.at(1) as ReturnType<typeof changeFavoriteStatus.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        changeFavoriteStatus.pending.type,
        changeFavoriteStatus.fulfilled.type,
      ]);

      expect(changeFavoriteStatusFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "changeFavoriteStatus.pending", "changeFavoriteStatus.rejected" when server response 400', async () => {
      const mockOffer = makeFakeOffer();
      const mockFavoriteData = {
        offerId: mockOffer.id,
        isFavorite: false,
      };
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockOffer.id}/${1}`).reply(400, null);

      await store.dispatch(changeFavoriteStatus(mockFavoriteData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatus.pending.type,
        changeFavoriteStatus.rejected.type,
      ]);
    });
  });
});
