import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const/enum';
import { AuthorizationEnum } from '../../const/type';
import HeaderLogoMemo from './header-logo';
import HeaderNavMemo from './header-nav';
import { getLayoutState } from './utils';
import FooterMemo from './footer';

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
            <HeaderLogoMemo />
            {shouldRenderUser && <HeaderNavMemo authorizationStatus={authorizationStatus}/>}
          </div >
        </div >
      </header >
      <Outlet />
      {shouldRenderFooter && <FooterMemo />}
    </div>
  );
}

export default Layout;
