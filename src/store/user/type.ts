import { UserData } from '../type';
import { AuthorizationStatus } from '../../const/enum';

export type InitialStateType = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
  isLoadingLogin: boolean;
  isLoadingLogout: boolean;
};
