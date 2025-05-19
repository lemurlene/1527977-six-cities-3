import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { name, internet, lorem, datatype } from 'faker';
import { State, UserData } from '../store/type';
import createAPI from '../services/api';
import { CardType, FullOfferType, ReviewType } from '../const/type';
import { LoadingStatus, AuthorizationStatus } from '../const/enum';
import { Setting } from '../const/const';
import { DefaultSort } from '../components/sort/const';


export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeFakeCard = (isFavorite = false): CardType => ({
  id: isFavorite ? 'faa632dd-82a8-4fe2-a397-91bdfe78a874' : '59e85f10-22f3-469d-8a64-f9480aa4bbad',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: isFavorite,
  isPremium: false,
  rating: 4,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  previewImage: 'https://url-to-image/image.png',
} as CardType);

export const makeFakeOffer = (isFavorite = false): FullOfferType => ({
  id: isFavorite ? 'faa632dd-82a8-4fe2-a397-91bdfe78a874' : '59e85f10-22f3-469d-8a64-f9480aa4bbad',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    }
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  isFavorite: isFavorite,
  isPremium: false,
  rating: 4,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: [
    'Heating'
  ],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
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
  rating: datatype.number({ min: 1, max: 5 }),
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
