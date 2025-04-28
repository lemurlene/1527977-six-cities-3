import { useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout';
import ErrorServer from '../error-server';
import MainPageWrapper from '../../pages/main-page';
import LoginPage from '../../pages/login-page';
import FavoritesPage from '../../pages/favorites-page';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import LoadingPage from '../../pages/loading-page';
import PrivateRouteMemo from '../private-route';
import { fetchOffers, checkAuthorization, fetchFavoriteOffers } from '../../store/api-action';
import { AppRoute } from '../../const/enum';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setErrorConnectionOffers } from '../../store/offers/offers.slice';
import { selectErrorConnectionOffers } from '../../store/offers/offers.selector';
import { selectAuthorization } from '../../store/user/user.selector';
import IsAppLoading from './utils';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorization);
  const isServerError = useAppSelector(selectErrorConnectionOffers);
  const isAppLoading = IsAppLoading();

  useEffect(() => {
    dispatch(fetchOffers())
      .unwrap()
      .then(() => {
        dispatch(setErrorConnectionOffers(false));
        dispatch(checkAuthorization())
          .then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
              dispatch(fetchFavoriteOffers());
            }
          });
      })
      .catch(() => {
        dispatch(setErrorConnectionOffers(true));
      });
  }, [dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        {isServerError ? (
          <ErrorServer mainPage />
        ) : (
          <Routes>
            <Route path={AppRoute.Root} element={<Layout authorizationStatus={authorizationStatus} />}>
              {isAppLoading ? (
                <Route index element={<LoadingPage />} />
              ) : (
                <>
                  <Route index element={<MainPageWrapper />} />
                  <Route
                    path={AppRoute.Login}
                    element={
                      <PrivateRouteMemo authorizationStatus={authorizationStatus} isReverse>
                        <LoginPage />
                      </PrivateRouteMemo>
                    }
                  />
                  <Route
                    path={AppRoute.Favorites}
                    element={
                      <PrivateRouteMemo authorizationStatus={authorizationStatus}>
                        <FavoritesPage />
                      </PrivateRouteMemo>
                    }
                  />
                  <Route
                    path={AppRoute.Offer}
                    element={<OfferPage authorizationStatus={authorizationStatus} />}
                  />
                  <Route
                    path={AppRoute.Error404}
                    element={<NotFoundPage />}
                  />
                </>
              )}
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </HelmetProvider >
  );
}

export default App;
