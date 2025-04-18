import { useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout';
import MainPageWrapper from '../../pages/main-page';
import LoginPage from '../../pages/login-page';
import FavoritesPage from '../../pages/favorites-page';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import LoadingPage from '../../pages/loading-page';
import PrivateRoute from '../private-route';
import { fetchOffers, checkAuthorization } from '../../store/api-action';
import { AppProps } from './type';
import { AppRoute, AuthorizationStatus } from '../../const/enum';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectLoading } from '../../store/selectors/offers';
import { selectAuthorization } from '../../store/selectors/api';

function App({ offers, cardsCount, offer, comments, offersNear, NearPlacesCardsCount }: AppProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorization);
  const isOffersLoading = useAppSelector(selectLoading);
  const authorizationStatusUnknown = AuthorizationStatus.Unknown;

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(checkAuthorization());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {
            (isOffersLoading)
            // (isOffersLoading || authorizationStatusUnknown)
              ?
              <Route path={AppRoute.Root} element={<Layout authorizationStatus={authorizationStatus} />}>
                <Route index
                  element={<LoadingPage />}
                />
              </Route>
              :
              <Route path={AppRoute.Root} element={<Layout authorizationStatus={authorizationStatus} />}>
                <Route index
                  element={<MainPageWrapper cardsCount={cardsCount} />}
                />
                <Route path={AppRoute.Login}
                  element={
                    <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
                      <LoginPage />
                    </PrivateRoute>
                  }
                />
                <Route path={AppRoute.Favorites}
                  element={
                    <PrivateRoute authorizationStatus={authorizationStatus}>
                      <FavoritesPage offers={offers} />
                    </PrivateRoute>
                  }
                />
                <Route path={AppRoute.Offer}
                  element={<OfferPage authorizationStatus={authorizationStatus} offer={offer} comments={comments} offersNear={offersNear} NearPlacesCardsCount={NearPlacesCardsCount} />}
                />
                <Route path={AppRoute.Error404}
                  element={<NotFoundPage />}
                />
              </Route>
          }
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
