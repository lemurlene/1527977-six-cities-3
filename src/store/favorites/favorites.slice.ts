import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './const';
import { NameSpace } from '../const';
import { LoadingStatus } from '../../const/enum';
import { fetchFavoriteOffers, changeFavoriteStatus } from '../api-action';

export const favoritesSlice = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.isFavoriteOffersLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(changeFavoriteStatus.pending, (state) => {
        state.uploadingFavoriteStatus = LoadingStatus.Loading;
      })
      .addCase(changeFavoriteStatus.rejected, (state) => {
        state.uploadingFavoriteStatus = LoadingStatus.Error;
        state.uploadingFavoriteStatus = LoadingStatus.Idle;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        state.uploadingFavoriteStatus = LoadingStatus.Success;
        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((item) => item.id !== action.payload.id);
        }
        state.uploadingFavoriteStatus = LoadingStatus.Idle;
      });
  }
});
