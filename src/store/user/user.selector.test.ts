import { selectAuthorization, selectUserInfo, selectLoadingLogin, selectLoadingLogout } from './user.selector';
import { makeFakeUser } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const/enum';
import { NameSpace } from '../const';
import type { RootState, UserData } from '../type';

describe('User selectors', () => {

  const mockUserInfo: UserData = makeFakeUser();

  const mockState: RootState = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: mockUserInfo,
      isLoadingLogin: true,
      isLoadingLogout: false,
    },
  } as unknown as RootState;

  it('selectAuthorization returns authorizationStatus', () => {
    expect(selectAuthorization(mockState)).toBe(AuthorizationStatus.Auth);
  });

  it('selectUserInfo returns userInfo', () => {
    expect(selectUserInfo(mockState)).toEqual(mockUserInfo);
  });

  it('selectLoadingLogin returns isLoadingLogin', () => {
    expect(selectLoadingLogin(mockState)).toBe(true);
  });

  it('selectLoadingLogout returns isLoadingLogout', () => {
    expect(selectLoadingLogout(mockState)).toBe(false);
  });
});
