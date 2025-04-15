import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort } from './action';
import { fetchOffers } from './api-action';
import { Setting } from '../const/const';
import { CitiesEnum, CardType } from '../const/type';
import { SortType } from '../components/sort/type';
import { DefaultSort } from '../components/sort/const';

interface AppState {
  city: CitiesEnum;
  offers: CardType[];
  sort: SortType;
  isLoading: boolean;
}

const initialState: AppState = {
  city: Setting.DefaultCity,
  offers: [],
  sort: DefaultSort,
  isLoading: false,
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
    });
});


export { reducer };
