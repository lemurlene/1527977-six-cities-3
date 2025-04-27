import { Status } from './const';
import { CardType, FullOfferType } from '../../const/type';

export type StatusType = typeof Status[keyof typeof Status];

export type InitialStateType = {
  favoriteOffers: (CardType | FullOfferType)[];
  isFavoriteOffersLoading: boolean;
  uploadingFavoriteStatus: StatusType;
};

