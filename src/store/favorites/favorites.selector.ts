import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { State } from '../type';
import { StatusType } from './type';


const selectFavoriteState = (state: State) => state[NameSpace.Favorite];

const selectFavoriteOffers = createSelector(
  [selectFavoriteState],
  (state) => state.favoriteOffers
);

export const selectFavoriteOffersCount = createSelector(
  [selectFavoriteOffers],
  (offers) => offers.length
);

const selectFavoriteOffersLoading = (state: State):boolean => state[NameSpace.Favorite].isFavoriteOffersLoading;
const selectUploadingFavoriteStatus = (state: State): StatusType => state[NameSpace.Favorite].uploadingFavoriteStatus;

export { selectFavoriteOffers, selectFavoriteOffersLoading, selectUploadingFavoriteStatus };
