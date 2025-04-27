import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { SortType } from '../../components/sort/type';
import { DefaultSort } from '../../components/sort/const';

type InitialStateType = {
  currentSortType: SortType;
};

const initialState: InitialStateType = {
  currentSortType: DefaultSort,
};

export const sortSlice = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {
    changeSort(state, action: PayloadAction<SortType>) {
      state.currentSortType = action.payload;
    },
  },
});

export const { changeSort } = sortSlice.actions;
