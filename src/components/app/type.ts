
import { CardType, OfferType, ReviewType } from '../../const/type';

export type AppProps = {
  offers: CardType[];
  cardsCount: number;
  offer: OfferType;
  comments: ReviewType[];
  offersNear: CardType[];
  NearPlacesCardsCount: number;
};
