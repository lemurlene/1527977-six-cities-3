import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/enum';
import HeaderLogo from './header-logo';
import HeaderNav from './header-nav';
import { getLayoutState } from './utils';
import Footer from './footer';

function Layout() {
  const { pathname } = useLocation();
  const { rootClassName, shouldRenderUser, shouldRenderFooter } = getLayoutState(pathname as AppRoute);
  return (
    <div className={`page ${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            {shouldRenderUser && <HeaderNav />}
          </div >
        </div >
      </header >
      <Outlet />
      {shouldRenderFooter && <Footer />}
    </div>
  );
}

export default Layout;
