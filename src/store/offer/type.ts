import { OfferType } from '../../const/type';

export type InitialStateType = {
  offer: OfferType | null;
  isLoadingOffer: boolean;
  isErrorConnectionOffer: boolean;
};

