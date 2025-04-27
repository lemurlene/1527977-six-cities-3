import { store } from './index.js';
import { CitiesEnum, CardType, OfferType, ReviewType } from '../const/type';
import { SortType } from '../components/sort/type';
import { AuthorizationStatus } from '../const/enum';

export type RootState = ReturnType<typeof store.getState>;
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export interface AppState {
  city: CitiesEnum;
  offers: CardType[];
  sort: SortType;
  offer: OfferType | null;
  offersNear: CardType[];
  offerComments: ReviewType[];
  isLoadingOffers: boolean;
  isLoadingOffer: boolean;
  isLoadingOffersNear: boolean;
  isLoadingOffersComments: boolean;
  isLoadingComment: boolean;
  isErrorConnection: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  error: string | null;
}

export type CommentType = {
  id: string;
  comment: {
    rating: number;
    review: string;
  };
};

export type FavoriteData = {
  offerId: string;
  isFavorite: boolean;
};
