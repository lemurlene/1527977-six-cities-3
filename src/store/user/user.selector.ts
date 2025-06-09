import type { RootState, UserData } from '../type';
import { AuthorizationEnum } from '../../const/type';
import { NameSpace } from '../const';

const selectAuthorization = (state: RootState):AuthorizationEnum => state[NameSpace.User].authorizationStatus;
const selectUserInfo = (state: RootState): UserData | null => state[NameSpace.User].userInfo;
const selectLoadingLogin = (state: RootState):boolean => state[NameSpace.User].isLoadingLogin;
const selectLoadingLogout = (state: RootState):boolean => state[NameSpace.User].isLoadingLogout;

export { selectAuthorization, selectUserInfo, selectLoadingLogin, selectLoadingLogout };
