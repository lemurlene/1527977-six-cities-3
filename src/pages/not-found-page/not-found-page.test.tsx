import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './not-found-page';
import { makeFakeCard, makeFakeStore } from '../../mocks/mocks';
import { LoadingStatus } from '../../const/enum';
import { withStore } from '../../mocks/mock-component';

describe('Component: NotFoundPage', () => {
  it('should render correct', () => {

    const { withStoreComponent } = withStore(<NotFoundPage />, makeFakeStore({
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

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();

  });
});


