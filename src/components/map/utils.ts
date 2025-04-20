import { AppRoute } from '../../const/enum';
import { matchPath } from 'react-router-dom';

export const getState = (pathname: AppRoute) => {
  const isOfferPage = matchPath(AppRoute.Offer, pathname);
  let rootClassPrefix = '';

  if (isOfferPage) {
    rootClassPrefix = ' offer';
  } else {
    rootClassPrefix = ' cities';
  }

  return { rootClassPrefix };
};
