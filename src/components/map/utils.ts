import { AppRoute } from '../../const/enum';

export const getState = (pathname: AppRoute) => {
  let rootClassPrefix = '';

  if (pathname === AppRoute.Root) {
    rootClassPrefix = ' cities';
  } else if (pathname === AppRoute.Offer) {
    rootClassPrefix = ' offer';
  }
  return { rootClassPrefix };
};
