import { InitialStateType } from './type';

export const Status = {
  Idle: 'IDLE',
  Loading: 'LOADING',
  Success: 'SUCCESS',
  Error: 'ERROR'
} as const;

export const initialState: InitialStateType = {
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
  uploadingFavoriteStatus: Status.Idle,
};
