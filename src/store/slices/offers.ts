import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { CitiesEnum, CardType } from '../../const/type';
import { Setting } from '../../const/const';
import { offers } from '../../mocks/offers';

interface OffersState {
  city: CitiesEnum;
  offers: CardType[];
}

const initialState: OffersState = {
  city: Setting.DefaultCity,
  offers,
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    changeCity: (state, action: PayloadAction<CitiesEnum>) => {
      state.city = action.payload;
    },
    getOffers: (state, action: PayloadAction<CitiesEnum>) => {
      state.city = action.payload;
    },
  },
});

export const {changeCity} = offersSlice.actions;

export { offersSlice };
