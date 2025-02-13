const isLogin = true;
const Email = 'Oliver.conner@gmail.com';
const FavoritesCount = 3;

function HeaderNav(): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="#">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {isLogin
              ? (
                <>
                  <span className="header__user-name user__name">{Email}</span>
                  <span className="header__favorite-count">{FavoritesCount}</span>
                </>
              )
              : (
                <span className="header__login">Sign in</span>
              )}
          </a>
        </li>

        {isLogin && (
          <li className="header__nav-item">
            <a className="header__nav-link" href="#">
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
