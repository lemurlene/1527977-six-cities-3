import { Link } from 'react-router-dom';
import { AuthorizationEnum } from '../../const/type';
import { AppRoute, AuthorizationStatus } from '../../const/enum';
import { logoutAction } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserInfo } from '../../store/selectors/api';

type HeaderProps = {
  authorizationStatus: AuthorizationEnum;
}

function HeaderNav({ authorizationStatus}: HeaderProps): JSX.Element {
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
  const targetRoute = isAuthenticated ? AppRoute.Favorites : AppRoute.Login;

  const userInfo = useAppSelector(selectUserInfo);
  let email = '';
  if(userInfo) {
    email = userInfo.email;
  }
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    if (isAuthenticated) {
      dispatch(logoutAction());
    }
  };

  const FAVORETES_COUNT = 0;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={targetRoute}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {isAuthenticated && (
              <>
                <span className="header__user-name user__name">{email}</span>
                <span className="header__favorite-count">{FAVORETES_COUNT}</span>
              </>
            )}
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

export default HeaderNav;
