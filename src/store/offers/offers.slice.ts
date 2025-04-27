import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { initialState } from './const';
import { NameSpace } from '../const';
import { fetchOffers, changeFavoriteStatus } from '../api-action';

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setErrorConnectionOffers(state, action: PayloadAction<boolean>) {
      state.isErrorConnectionOffers = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoadingOffers = true;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoadingOffers = false;
        state.isErrorConnectionOffers = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoadingOffers = false;
        state.isErrorConnectionOffers = false;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const offersIndex = state.offers.findIndex((item) => item.id === action.payload.id);
        if (offersIndex !== -1) {
          state.offers[offersIndex].isFavorite = action.payload.isFavorite;
        }
      });
  }
});

export const { setErrorConnectionOffers } = offersSlice.actions;
