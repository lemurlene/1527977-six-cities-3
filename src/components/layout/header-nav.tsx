import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const/enum';
import { EMAIL, FAVORETES_COUNT } from '../../mocks/const';
import { getAuthorizationStatus } from '../../mocks/authorizationStatus';
import { AppRoute } from '../../const/enum';

function HeaderNav(): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();
  const isAuthenticated = authorizationStatus === AuthorizationStatus.Auth;
  const targetRoute = isAuthenticated ? AppRoute.Favorites : AppRoute.Login;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={targetRoute}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {isAuthenticated && (
              <>
                <span className="header__user-name user__name">{EMAIL}</span>
                <span className="header__favorite-count">{FAVORETES_COUNT}</span>
              </>
            )}
            {!isAuthenticated && <span className="header__login">Sign in</span>}
          </Link>
        </li>
        {isAuthenticated && (
          <li className="header__nav-item">
            <Link className="header__nav-link" to="/">
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
