import { createReducer } from '@reduxjs/toolkit';
import { changeCity, getOffers, changeSort } from './action';
import { Setting } from '../const/const';
import { CitiesEnum, CardType } from '../const/type';
import { SortType } from '../components/sort/type';
import { DefaultSort } from '../components/sort/const';

const initialState = {
  city: Setting.DefaultCity as CitiesEnum,
  offers: [] as CardType[],
  sort: DefaultSort as SortType,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    });
});


export { reducer };
