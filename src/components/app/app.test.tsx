import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import App from '.';
import { makeFakeOffer, makeFakeUser } from '../../mocks/mocks';
import createAPI from '../../services/api';
import { State } from '../../store/type';
import { Setting } from '../../const/const';
import { DefaultSort } from '../sort/const';
import { LoadingStatus, AuthorizationStatus } from '../../const/enum';
const mockProcessErrorHandle = vi.fn();


const api = createAPI(mockProcessErrorHandle);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

describe('App component', () => {
  const mockOffers = [makeFakeOffer()];

  it('should render LoadingPage when app is loading', () => {
    const store = mockStore({
      OFFERS: {
        offers: [],
        isLoadingOffers: true,
        isErrorConnectionOffers: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userInfo: null,
        isLoadingLogin: false,
        isLoadingLogout: false,
      },
      FAVORITE: {
        favoriteOffers: [],
        isFavoriteOffersLoading: true,
        uploadingFavoriteStatus: LoadingStatus.Idle,
      },
      CITY: {
        currentCity: Setting.DefaultCity,
      },
      SORT: {
        currentSortType: DefaultSort,
      },
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByTestId('loading-page')).toBeInTheDocument();
  });

  it('should render MainPage when app is loaded', () => {
    const store = mockStore({
      OFFERS: {
        offers: mockOffers,
        isLoadingOffers: false,
        isErrorConnectionOffers: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUser(),
        isLoadingLogin: false,
        isLoadingLogout: false,
      },
      FAVORITE: {
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        uploadingFavoriteStatus: LoadingStatus.Idle,
      },
      CITY: {
        currentCity: Setting.DefaultCity,
      },
      SORT: {
        currentSortType: DefaultSort,
      },
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render ErrorServer when connection error occurs', () => {
    const store = mockStore({
      OFFERS: {
        offers: [],
        isLoadingOffers: false,
        isErrorConnectionOffers: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUser(),
        isLoadingLogin: false,
        isLoadingLogout: false,
      },
      FAVORITE: {
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        uploadingFavoriteStatus: LoadingStatus.Idle,
      },
      CITY: {
        currentCity: Setting.DefaultCity,
      },
      SORT: {
        currentSortType: DefaultSort,
      },
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByTestId('error-server')).toBeInTheDocument();
  });

  it('should dispatch necessary actions on mount', () => {
    const store = mockStore({
      OFFERS: {
        offers: mockOffers,
        isLoadingOffers: false,
        isErrorConnectionOffers: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUser(),
        isLoadingLogin: false,
        isLoadingLogout: false,
      },
      FAVORITE: {
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        uploadingFavoriteStatus: LoadingStatus.Idle,
      },
      CITY: {
        currentCity: Setting.DefaultCity,
      },
      SORT: {
        currentSortType: DefaultSort,
      },
    });

    render(
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    );

    const actionTypes = store.getActions().map((action: { type: string }) => action.type);

    expect(actionTypes).toContain('OFFERS/fetchOffers/pending');
    expect(actionTypes).toContain('CITY/changeCity');
  });
});

