import type { State } from '../type';
import { NameSpace } from '../const';
import { OfferType } from '../../const/type';

const selectOffer = (state: State):OfferType | null => state[NameSpace.Offer].offer;
const selectOfferLoading = (state: State):boolean => state[NameSpace.Offer].isLoadingOffer;
const selectErrorConnection = (state: State): boolean => state[NameSpace.Offer].isErrorConnectionOffer;

export {selectOffer, selectOfferLoading, selectErrorConnection};
