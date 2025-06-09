import { InitialStateType } from './type';
import { LoadingStatus } from '../../const/enum';

export const initialState: InitialStateType = {
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
  uploadingFavoriteStatus: LoadingStatus.Idle,
};
