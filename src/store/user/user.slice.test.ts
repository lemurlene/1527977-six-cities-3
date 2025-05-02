import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from '../../mock';
import { createAPI } from '../../services/api';
import { APIRoute } from '../../const/enum';
import { Setting } from '../../const/const';
import { DefaultSort } from '../../components/sort/const';
import { RootState } from '../type';
import { checkAuthorization, loginAction, logoutAction } from '../api-action';
import { AuthData } from '../type';

describe('Acync actioins', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ App: { currentCity: Setting.DefaultCity, currentSort: DefaultSort }});
  });

  describe('checkAuthorization slice', () => {
    it('should dispatch checkAuthAction.pending and checkAuthAction.fulfilled with thunk checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthorization());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorization.pending.type,
        checkAuthorization.fulfilled.type,
      ]);
    });

    it('should dispatch checkAuthorization.pending and checkAuthorization.rejected when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthorization());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthorization.pending.type,
        checkAuthorization.rejected.type,
      ]);
    });

    describe('loginAction', () => {
      it('should dispatch loginAction.pending, redirectToRoute, loginAction.fulfilled when server response 200', async() => {
        const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
        const fakeServerReplay = { token: 'secret' };
        mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

        await store.dispatch(loginAction(fakeUser));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          loginAction.pending.type,
          redirectToRoute.type,
          loginAction.fulfilled.type,
        ]);
      });

      it('should call saveToken once with the received token', async () => {
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
      it('should dispatch logoutAction.pending, logoutAction.fulfilled when server response 204', async() => {
        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

        await store.dispatch(logoutAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          logoutAction.pending.type,
          logoutAction.fulfilled.type,
        ]);
      });

      it('should one call dropToken with logoutAction', async () => {
        mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
        const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

        await store.dispatch(logoutAction());

        expect(mockDropToken).toBeCalledTimes(1);
      });
    });
  });
});
