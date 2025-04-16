import type { RootState } from '../type';

const selectOffers = (state: RootState) => state.offers;
const selectCity = (state: RootState) => state.city;
const selectSort = (state: RootState) => state.sort;
const selectLoading = (state: RootState):boolean => state.isLoading;

export { selectOffers, selectCity, selectSort, selectLoading };
