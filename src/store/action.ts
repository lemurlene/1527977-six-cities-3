import {createAction} from '@reduxjs/toolkit';
import { CitiesEnum } from '../const/type';
import { SortType } from '../components/sort/type';

const changeCity = createAction<CitiesEnum>('offers/changeCity');
const changeSort = createAction<SortType>('sort/changeSort');
const setError = createAction<string | null>('app/setError');
const setErrorConnection = createAction<boolean>('error/setErrorConnection');

export { changeCity, changeSort, setError, setErrorConnection };
