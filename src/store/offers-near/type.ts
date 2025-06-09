import { CardType } from '../../const/type';

export type InitialStateType = {
  offersNear: CardType[];
  isLoadingOffersNear: boolean;
  isErrorConnectionOffers: boolean;
};
