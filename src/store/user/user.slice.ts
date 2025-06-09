import { createSlice } from '@reduxjs/toolkit';
import { checkAuthorization, loginAction, logoutAction } from '../api-action';
import { NameSpace } from '../const';
import { initialState } from './const';
import { handleAuthSuccess, handleAuthFailure } from './utils';

const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        handleAuthSuccess(state, action.payload);
      })
      .addCase(checkAuthorization.rejected, handleAuthFailure)
      .addCase(loginAction.pending, (state) => {
        state.isLoadingLogin = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoadingLogin = false;
        handleAuthSuccess(state, action.payload);
      })
      .addCase(loginAction.rejected, (state) => {
        state.isLoadingLogin = false;
        handleAuthFailure(state);
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoadingLogout = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoadingLogout = false;
        handleAuthFailure(state);
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLoadingLogout = false;
      });
  },
});

export default userSlice;
