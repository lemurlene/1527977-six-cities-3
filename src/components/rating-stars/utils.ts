import { AppRoute } from '../../const/enum';

export const getState = (pathname: AppRoute) => {
  let placeClassPrefix = '';
  let shouldRenderValue = false;

  if (pathname === AppRoute.Root || pathname === AppRoute.Favorites) {
    placeClassPrefix = ' place-card';
  } else if (pathname === AppRoute.Offer) {
    placeClassPrefix = ' offer';
    shouldRenderValue = true;
    // нужно будет разделить reviews и offer-near
    //   placeClassPrefix = ' reviews__stars';
    // placeClassPrefix = ' place-card';
  }

  return { placeClassPrefix, shouldRenderValue };
};
