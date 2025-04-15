
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState, AppDispatch } from './type';
import { CardType } from '../const/type';
import { APIRoute } from './const';


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

export { fetchOffers };
