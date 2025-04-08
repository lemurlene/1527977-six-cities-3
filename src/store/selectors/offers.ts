import type { RootState } from '../type';

const selectOffers = (state: RootState) => state.offers;
const selectCity = (state: RootState) => state.city;
const selectSort = (state: RootState) => state.sort;

export {selectOffers, selectCity, selectSort};
