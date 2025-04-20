import { AppRoute } from '../../const/enum';
import { matchPath } from 'react-router-dom';

export const getState = (pathname: AppRoute) => {
  let placeClassPrefix = '';
  let offerListClass = '';
  let addInfoClass = '';

  if (pathname === AppRoute.Favorites) {
    placeClassPrefix = ' favorites';
    addInfoClass = ' favorites__card-info';
  } else if (matchPath(AppRoute.Offer, pathname)) {
    placeClassPrefix = ' near-places';
    offerListClass = ' near-places__list';
  } else {
    placeClassPrefix = ' cities';
    offerListClass = ' cities__places-list tabs__content';
  }
  return { placeClassPrefix, addInfoClass, offerListClass };
};
