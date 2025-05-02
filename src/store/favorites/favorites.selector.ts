import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { State } from '../type';

const selectFavoriteState = (state: Pick<State, typeof NameSpace.Favorite>) =>
  state[NameSpace.Favorite];

const selectFavoriteOffers = createSelector(
  [selectFavoriteState],
  (state) => state.favoriteOffers
);

export const selectFavoriteOffersCount = createSelector(
  [selectFavoriteOffers],
  (offers) => offers.length
);

const selectFavoriteOffersLoading = (state: Pick<State, typeof NameSpace.Favorite>) =>
  state[NameSpace.Favorite].isFavoriteOffersLoading;
const selectUploadingFavoriteStatus = (state: Pick<State, typeof NameSpace.Favorite>) =>
  state[NameSpace.Favorite].uploadingFavoriteStatus;

export { selectFavoriteOffers, selectFavoriteOffersLoading, selectUploadingFavoriteStatus };
