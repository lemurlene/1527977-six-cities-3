import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { name, internet, lorem, datatype } from 'faker';
import { State, UserData } from '../store/type';
import createAPI from '../services/api';
import { CardType, FullOfferType, ReviewType, CityType, CitiesEnum } from '../const/type';
import { LoadingStatus, AuthorizationStatus } from '../const/enum';
import { Setting, Cities, CityLocation } from '../const/const';
import { DefaultSort } from '../components/sort/const';
import { getRandomCity } from '../pages/login-page/utils';
import { generateRating } from './utils';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

const createMockCity = (cityKey?: CitiesEnum): CityType => {
  const key = cityKey || getRandomCity();
  const cityName = Cities[key];

  return {
    name: cityName,
    location: {
      latitude: CityLocation[cityName].latitude,
      longitude: CityLocation[cityName].longitude,
      zoom: CityLocation[cityName].zoom
    }
  };
};

export const makeFakeCard = (params: {
  isFavorite?: boolean;
  cityKey?: CitiesEnum;
} = {}): CardType => {
  const city = createMockCity(params.cityKey);
  const cardId = params.isFavorite
    ? 'faa632dd-82a8-4fe2-a397-91bdfe78a874'
    : '59e85f10-22f3-469d-8a64-f9480aa4bbad';

  return {
    id: cardId,
    title: lorem.sentence(),
    type: 'apartment',
    price: 120,
    city: city,
    location: { ...city.location },
    isFavorite: params.isFavorite ?? false,
    isPremium: false,
    rating: generateRating(),
    description: lorem.sentence(),
    previewImage: 'https://url-to-image/image.png',
  } as CardType;
};


export const makeFakeOffer = (params: Parameters<typeof makeFakeCard>[0] = {}): FullOfferType => ({
  ...makeFakeCard(params),
  description: lorem.sentence(),
  bedrooms: 3,
  goods: [
    'Heating'
  ],
  host: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: false
  },
  images: [
    'https://url-to-image/image.png'
  ],
  maxAdults: 4
} as FullOfferType);

export const makeFakeReview = () => ({
  id: 'faa632dd-82a8-4fe2-a397-91bdfe78a874',
  date: new Date().toISOString(),
  user: {
    name: name.title(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  },
  comment: lorem.sentence(),
  rating: generateRating(),
} as ReviewType);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userInfo: null,
    isLoadingLogin: false,
    isLoadingLogout: false,
  },
  OFFER: {
    offer: null,
    isLoadingOffer: false,
    isErrorConnectionOffer: false,
  },
  OFFERS: {
    offers: [],
    isLoadingOffers: false,
    isErrorConnectionOffers: false,
  },
  OFFERS_NEAR: {
    offersNear: [],
    isLoadingOffersNear: false,
    isErrorConnectionOffers: false,
  },
  SORT: {
    currentSortType: DefaultSort,
  },
  CITY: {
    currentCity: Setting.DefaultCity,
  },
  FAVORITE: {
    favoriteOffers: [],
    isFavoriteOffersLoading: false,
    uploadingFavoriteStatus: LoadingStatus.Idle,
  },
  REVIEWS: {
    offerComments: [],
    isLoadingComments: false,
    isLoadingComment: false,
  },
  ERROR: {
    error: null,
  },
  ...initialState ?? {},
});

export const makeFakeUser = (): UserData => (
  {
    id: 123,
    email: 'test@test.ru',
    token: 'secret'
  }
);
