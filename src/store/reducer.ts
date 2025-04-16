import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, setError } from './action';
import { fetchOffers, checkAuthorization, loginAction, logoutAction } from './api-action';
import { AppState } from './type';
import { Setting } from '../const/const';
import { DefaultSort } from '../components/sort/const';
import { AuthorizationStatus } from '../const/enum';

const initialState: AppState = {
  city: Setting.DefaultCity,
  offers: [],
  sort: DefaultSort,
  isLoading: false,
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
      state.isLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isLoading = false;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
