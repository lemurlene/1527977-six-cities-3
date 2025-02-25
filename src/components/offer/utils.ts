import { AppRoute } from '../../const/enum';

export const getState = (pathname: AppRoute) => {
  let placeClassPrefix = '';
  let addInfoClass = '';

  if (pathname === AppRoute.Root) {
    placeClassPrefix = ' cities';
  } else if (pathname === AppRoute.Favorites) {
    placeClassPrefix = ' favorites';
    addInfoClass = ' favorites__card-info';
  } else if (pathname === AppRoute.Offer) {
    placeClassPrefix = ' near-places';
  }

  return { placeClassPrefix, addInfoClass };
};
