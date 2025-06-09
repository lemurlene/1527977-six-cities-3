import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import FavoritesPage from './favorites-page';
import { makeFakeCard, makeFakeStore } from '../../mocks/mocks';
import { LoadingStatus } from '../../const/enum';
import { withStore } from '../../mocks/mock-component';

describe('Component: FavoritesPage', () => {
  it('should render correct', () => {

    const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore({
      FAVORITE: {
        favoriteOffers: [makeFakeCard()],
        isFavoriteOffersLoading: false,
        uploadingFavoriteStatus: LoadingStatus.Idle
      }
    }));

    render(
      <BrowserRouter>
        <HelmetProvider>
          {withStoreComponent}
        </HelmetProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();

  });

  it('should render empty with offersLength === 0', () => {

    const { withStoreComponent } = withStore(<FavoritesPage />, makeFakeStore({
      FAVORITE: {
        favoriteOffers: [],
        isFavoriteOffersLoading: false,
        uploadingFavoriteStatus: LoadingStatus.Idle
      }
    }));

    render(
      <BrowserRouter>
        <HelmetProvider>
          {withStoreComponent}
        </HelmetProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();

  });
});

