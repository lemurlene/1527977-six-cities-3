import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './const';
import { NameSpace } from '../const';
import { getOfferInfoById, changeFavoriteStatus } from '../api-action';

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setErrorConnectionStatusOffer(state, action: PayloadAction<boolean>) {
      state.isErrorConnectionOffer = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOfferInfoById.pending, (state) => {
        state.isLoadingOffer = true;
      })
      .addCase(getOfferInfoById.rejected, (state) => {
        state.isLoadingOffer = false;
        state.isErrorConnectionOffer = false;
      })
      .addCase(getOfferInfoById.fulfilled, (state, action) => {
        if (action.payload) {
          state.offer = action.payload;
        }
        state.isLoadingOffer = false;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        if (state.offer && state.offer.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
      });
  }
});

export const { setErrorConnectionStatusOffer } = offerSlice.actions;
