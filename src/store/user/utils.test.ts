import { handleAuthSuccess, handleAuthFailure } from './utils';
import { InitialStateType } from './type';
import { AuthorizationStatus } from '../../const/enum';
import { makeFakeUser } from '../../mocks/mocks';


describe('Auth handlers', () => {
  const mockUserInfo = makeFakeUser();

  let state: InitialStateType;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null,
      isLoadingLogin: false,
      isLoadingLogout: false,
    };
  });

  it('handleAuthSuccess sets authorizationStatus to Auth and updates userInfo', () => {
    handleAuthSuccess(state, mockUserInfo);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userInfo).toEqual(mockUserInfo);
  });

  it('handleAuthFailure resets authorizationStatus to NoAuth and clears userInfo', () => {
    state.authorizationStatus = AuthorizationStatus.Auth;
    state.userInfo = mockUserInfo;

    handleAuthFailure(state);

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.userInfo).toBeNull();
  });
});
