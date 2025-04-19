import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, setError, setErrorConnection } from './action';
import { fetchOffers, checkAuthorization, loginAction, logoutAction, getOfferInfoById,
  fetchOffersNear, fetchOfferComments, postOfferComment } from './api-action';
import { AppState } from './type';
import { Setting } from '../const/const';
import { DefaultSort } from '../components/sort/const';
import { AuthorizationStatus } from '../const/enum';

const initialState: AppState = {
  city: Setting.DefaultCity,
  offers: [],
  sort: DefaultSort,
  offer: null,
  offersNear: [],
  offerComments: [],
  isLoadingOffers: false,
  isLoadingOffer: false,
  isLoadingOffersNear: false,
  isLoadingOffersComments: false,
  isLoadingComment: false,
  isErrorConnection: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  userData: null,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isLoadingOffers = true;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isLoadingOffers = false;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isLoadingOffers = false;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(getOfferInfoById.pending, (state) => {
      state.isLoadingOffer = true;
    })
    .addCase(getOfferInfoById.rejected, (state) => {
      state.isLoadingOffer = false;
      state.isErrorConnection = false;
    })
    .addCase(getOfferInfoById.fulfilled, (state, action) => {
      if (action.payload) {
        state.offer = action.payload;
      }
      state.isLoadingOffer = false;
    })
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
    .addCase(fetchOfferComments.pending, (state) => {
      state.isLoadingOffersComments = true;
    })
    .addCase(fetchOfferComments.rejected, (state) => {
      state.isLoadingOffersComments = false;
    })
    .addCase(fetchOfferComments.fulfilled, (state, action) => {
      if (action.payload) {
        state.offerComments = action.payload;
      }
      state.isLoadingOffersComments = false;
    })
    .addCase(postOfferComment.pending, (state) => {
      state.isLoadingComment = true;
    })
    .addCase(postOfferComment.rejected, (state) => {
      state.isLoadingComment = false;
    })
    .addCase(postOfferComment.fulfilled, (state, action) => {
      state.offerComments = state.offerComments.concat([action.payload]);
      state.isLoadingComment = false;
    })
    .addCase(checkAuthorization.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    })
    .addCase(checkAuthorization.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    })
    .addCase(setErrorConnection, (state, action) => {
      state.isErrorConnection = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
