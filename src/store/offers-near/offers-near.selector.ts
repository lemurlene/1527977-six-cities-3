import type { State } from '../type';
import { NameSpace } from '../const';
import { CardType } from '../../const/type';

const selectOffersNear = (state: State):CardType[] => state[NameSpace.OffersNear].offersNear;
const selectOffersNearLoading = (state: State):boolean => state[NameSpace.OffersNear].isLoadingOffersNear;
const selectErrorConnectionOffers = (state: State): boolean => state[NameSpace.OffersNear].isErrorConnectionOffers;

export { selectOffersNear, selectOffersNearLoading, selectErrorConnectionOffers };
