import { matchPath } from 'react-router-dom';
import { AppRoute } from '../../const/enum';

export const getLayoutState = (pathname: AppRoute) => {
  const isOfferPage = matchPath(AppRoute.Offer, pathname);
  let rootClassName = '';
  let linkClassName = '';
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Root) {
    rootClassName = ' page--gray page--main';
    linkClassName = 'header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  } else if (!isOfferPage) {
    rootClassName = ' page--gray page--main';
    shouldRenderFooter = true;
  }
  return { rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter };
};
