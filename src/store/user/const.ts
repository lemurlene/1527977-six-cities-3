import { InitialStateType } from './type';
import { AuthorizationStatus } from '../../const/enum';

export const initialState: InitialStateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  isLoadingLogin: false,
  isLoadingLogout: false,
};
