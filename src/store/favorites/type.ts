import { LoadingStatus } from '../../const/enum';
import { CardType, FullOfferType } from '../../const/type';

export type StatusType = typeof LoadingStatus[keyof typeof LoadingStatus];

export type InitialStateType = {
  favoriteOffers: (CardType | FullOfferType)[];
  isFavoriteOffersLoading: boolean;
  uploadingFavoriteStatus: StatusType;
};

