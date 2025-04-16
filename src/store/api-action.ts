
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { setError } from './action';
import {saveToken, dropToken} from '../services/token';
import { RootState, AppDispatch, AuthData, UserData } from './type';
import { CardType } from '../const/type';
import { APIRoute, TIMEOUT_SHOW_ERROR } from './const';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();

const fetchOffers = createAppAsyncThunk<CardType[], undefined>(
  'offers/fetchOffers',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<CardType[]>(APIRoute.Offers);
    return data;
  }
);

const checkAuthorization = createAppAsyncThunk<UserData, undefined>(
  'user/checkAuth',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

const loginAction = createAppAsyncThunk<UserData, AuthData>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const {data} = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  }
);

const logoutAction = createAppAsyncThunk<void, undefined>(
  'user/logout',
  async (_arg, {extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export { fetchOffers, checkAuthorization, loginAction, logoutAction, clearErrorAction };
