import { SortType } from './type';
import { SortTypes } from './const';
import { CardType } from '../../const/type';

const sortBy = {
  [SortTypes.Popular]: (offers: CardType[]): CardType[] =>
    offers,
  [SortTypes.Low]: (offers: CardType[]): CardType[] =>
    [...offers].sort((a, b) => a.price - b.price),
  [SortTypes.High]: (offers: CardType[]): CardType[] =>
    [...offers].sort((a, b) => b.price - a.price),
  [SortTypes.Top]: (offers: CardType[]): CardType[] =>
    [...offers].sort((a, b) => b.rating - a.rating),
};

const sortOffers = (offers: CardType[], sortType: SortType): CardType[] =>
  sortBy[sortType](offers);

export { sortOffers };

