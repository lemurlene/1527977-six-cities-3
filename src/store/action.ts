import {createAction} from '@reduxjs/toolkit';
import { CitiesEnum, CardType } from '../const/type';
import { SortType } from '../components/sort/type';

export const changeCity = createAction<CitiesEnum>('offers/changeCity');
export const getOffers = createAction<CardType[]>('offers/getOffers');
export const changeSort = createAction<SortType>('sort/changeSort');
