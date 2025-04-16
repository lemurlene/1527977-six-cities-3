import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/enum';
import { AuthorizationEnum } from '../../const/type';
import HeaderLogo from './header-logo';
import HeaderNav from './header-nav';
import { getLayoutState } from './utils';
import Footer from './footer';

type LayoutProps = {
  authorizationStatus: AuthorizationEnum;
}

function Layout({ authorizationStatus}: LayoutProps) {
  const { pathname } = useLocation();
  const { rootClassName, shouldRenderUser, shouldRenderFooter } = getLayoutState(pathname as AppRoute);
  return (
    <div className={`page ${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            {shouldRenderUser && <HeaderNav authorizationStatus={authorizationStatus}/>}
          </div >
        </div >
      </header >
      <Outlet />
      {shouldRenderFooter && <Footer />}
    </div>
  );
}

export default Layout;
