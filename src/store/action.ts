import {createAction} from '@reduxjs/toolkit';
import { CitiesEnum } from '../const/type';
import { SortType } from '../components/sort/type';

export const changeCity = createAction<CitiesEnum>('offers/changeCity');
export const changeSort = createAction<SortType>('sort/changeSort');
export const changeLoadingStatus = createAction<boolean>('offers/changeLoadingStatus');
