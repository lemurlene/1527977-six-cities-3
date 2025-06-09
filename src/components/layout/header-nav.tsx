import { Link } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { AuthorizationEnum } from '../../const/type';
import { AppRoute, AuthorizationStatus } from '../../const/enum';
import { logoutAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import UserInfoMemo from './user-info';

type HeaderProps = {
  authorizationStatus: AuthorizationEnum;
}

function HeaderNav({ authorizationStatus}: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
  const targetRoute = isAuthenticated ? AppRoute.Favorites : AppRoute.Login;

  const handleLogout = useCallback(() => {
    if (isAuthenticated) {
      dispatch(logoutAction());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <nav className="header__nav" data-testid="header-nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={targetRoute}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {isAuthenticated && <UserInfoMemo/>}
            {!isAuthenticated && <span className="header__login">Sign in</span>}
          </Link>
        </li>
        {isAuthenticated && (
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              onClick={handleLogout}
              to={AppRoute.Root}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

const HeaderNavMemo = memo(HeaderNav);

export default HeaderNavMemo;
