import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './action';
import {saveToken, dropToken} from '../services/token';
import { AuthData, UserData, CommentType } from './type';
import { CardType, OfferType, ReviewType } from '../const/type';
import { APIRoute, TIMEOUT_SHOW_ERROR } from './const';
import { createAppAsyncThunk } from '../hooks';

const fetchOffers = createAppAsyncThunk<CardType[], undefined>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<CardType[]>(APIRoute.Offers);
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
  async (_, { dispatch }) => {
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT_SHOW_ERROR));
    dispatch(setError(null));
  }
);


const getOfferInfoById = createAppAsyncThunk<OfferType, string>(
  'offer/getOfferInfo',
  async (id, { extra: api }) => {
    const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

const fetchOffersNear = createAppAsyncThunk<CardType[], string>(
  'offers/fetchNearbyOffers',
  async (id, { extra: api }) => {
    const { data } = await api.get<CardType[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

const fetchOfferComments = createAppAsyncThunk<ReviewType[], string>(
  'offer/fetchOfferComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

const postOfferComment = createAppAsyncThunk<ReviewType, CommentType>(
  'offer/postOfferComment',
  async ({ id, comment }, { extra: api }) => {
    const { data } = await api.post<ReviewType>(`${APIRoute.Comments}/${id}`,{ comment: comment.review, rating: +comment.rating });
    return data;
  }
);

export { fetchOffers, checkAuthorization, loginAction, logoutAction, clearErrorAction,
  getOfferInfoById, fetchOffersNear, fetchOfferComments, postOfferComment };
