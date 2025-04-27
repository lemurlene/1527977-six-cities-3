import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { initialState } from './const';
import { NameSpace } from '../const';
import { fetchOffersNear, changeFavoriteStatus } from '../api-action';

export const offersNearSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setErrorConnectionStatusOffers(state, action: PayloadAction<boolean>) {
      state.isErrorConnectionOffers = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNear.pending, (state) => {
        state.isLoadingOffersNear = true;
      })
      .addCase(fetchOffersNear.rejected, (state) => {
        state.isLoadingOffersNear = false;
      })
      .addCase(fetchOffersNear.fulfilled, (state, action) => {
        if (action.payload) {
          state.offersNear = action.payload;
        }
        state.isLoadingOffersNear = false;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        const offersNearIndex = state.offersNear.findIndex((item) => item.id === action.payload.id);
        if (offersNearIndex !== -1) {
          state.offersNear[offersNearIndex].isFavorite = action.payload.isFavorite;
        }
      });
  }
});

export const { setErrorConnectionStatusOffers } = offersNearSlice.actions;
