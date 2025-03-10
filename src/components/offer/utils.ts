import { AppRoute } from '../../const/enum';

export const getState = (pathname: AppRoute) => {
  let placeClassPrefix = '';
  let offerListClass = '';
  let addInfoClass = '';

  if (pathname === AppRoute.Root) {
    placeClassPrefix = ' cities';
    offerListClass = ' cities__places-list tabs__content';
  } else if (pathname === AppRoute.Favorites) {
    placeClassPrefix = ' favorites';
    addInfoClass = ' favorites__card-info';
  } else if (pathname === AppRoute.Offer) {
    placeClassPrefix = ' near-places';
    offerListClass = ' near-places__list';
  }

  return { placeClassPrefix, addInfoClass, offerListClass };
};
