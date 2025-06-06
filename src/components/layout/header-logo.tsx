import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/enum';
import { getLayoutState } from './utils';

function HeaderLogo(): JSX.Element {
  const { pathname } = useLocation();
  const { linkClassName } = getLayoutState(pathname as AppRoute);
  return (
    <div className="header__left">
      <Link className={`header__logo-link ${linkClassName}`} to="/">
        <img className='header__logo' src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
      </Link>
    </div >
  );
}

export default HeaderLogo;
