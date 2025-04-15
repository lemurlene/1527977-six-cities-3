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
import { CardType, OfferType, ReviewType } from '../../const/type';
import { AppRoute } from '../../const/enum';
import { getAuthorizationStatus } from '../../mocks/authorizationStatus';
import { useAppSelector } from '../../hooks/store';
import { selectLoading } from '../../store/selectors/offers';

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
  const isOffersLoading = useAppSelector(selectLoading);
  return (
    <HelmetProvider>
      <BrowserRouter>
        {isOffersLoading && <LoadingPage />}
        {!isOffersLoading &&
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
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
              element={<OfferPage offer={offer} comments={comments} offersNear={offersNear} NearPlacesCardsCount={NearPlacesCardsCount}/>}
            />
            <Route path={AppRoute.Error404}
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>}
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
