import type { RootState } from '../type';

const selectOffers = (state: RootState) => state.offers;
const selectCity = (state: RootState) => state.city;
const selectSort = (state: RootState) => state.sort;
const selectLoadingOffers = (state: RootState):boolean => state.isLoadingOffers;

export { selectOffers, selectCity, selectSort, selectLoadingOffers };
