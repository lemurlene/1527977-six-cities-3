import { InitialStateType } from './type';
import { UserData } from '../type';
import { AuthorizationStatus } from '../../const/enum';

const handleAuthSuccess = (state: InitialStateType, userInfo: UserData) => {
  state.authorizationStatus = AuthorizationStatus.Auth;
  state.userInfo = userInfo;
};

const handleAuthFailure = (state: InitialStateType) => {
  state.authorizationStatus = AuthorizationStatus.NoAuth;
  state.userInfo = null;
};

export { handleAuthSuccess, handleAuthFailure };
