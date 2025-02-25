import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout';
import MainPage from '../../pages/main-page';
import LoginPage from '../../pages/login-page';
import FavoritesPage from '../../pages/favorites-page';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import PrivateRoute from '../private-route';
import { CardType, OfferType, ReviewType } from '../../const/type';
import { AppRoute } from '../../const/enum';
import { getAuthorizationStatus } from '../../mocks/authorizationStatus';

type AppProps = {
  offers: CardType[];
  cardsCount: number;
  offer: OfferType;
  comments: ReviewType[];
  offersNear: CardType[];
  NearPlacesCardsCount: number;
}

function App({ offers, cardsCount, offer, comments, offersNear, NearPlacesCardsCount }: AppProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index
              element={<MainPage offers={offers} cardsCount={cardsCount} />}
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
              element={<OfferPage offer={offer} comments={comments} offersNear={offersNear} NearPlacesCardsCount={NearPlacesCardsCount} />}
            />
            <Route path={AppRoute.Error404}
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
