import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { CitiesEnum } from '../../const/type';
import { Setting } from '../../const/const';

type InitialStateType = {
  currentCity: CitiesEnum;
};

const initialState: InitialStateType = {
  currentCity: Setting.DefaultCity,
};

export const citySlice = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity (state, action: PayloadAction<CitiesEnum>) {
      state.currentCity = action.payload;
    },
  },
});

export const { changeCity } = citySlice.actions;
