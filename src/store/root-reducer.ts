import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from './const';
import { citySlice } from './city/city.slice';
import { sortSlice } from './sort/sort.slice';
import userSlice from './user/user.slice';
import { errorSlice } from './error/error.slice';
import { offersSlice } from './offers/offers.slice';
import { offerSlice } from './offer/offer.slice';
import { offersNearSlice } from './offers-near/offers-near.slice';
import reviewsSlice from './reviews/reviews.slice';
import { favoritesSlice } from './favorites/favorites.slice';

const rootReducer = combineReducers({
  [NameSpace.City]: citySlice.reducer,
  [NameSpace.Sort]: sortSlice.reducer,
  [NameSpace.Error]: errorSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.OffersNear]: offersNearSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.Favorite]: favoritesSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
});

export default rootReducer;
