import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoadingPage from './loading-page';
import { makeFakeCard, makeFakeStore } from '../../mocks/mocks';
import { LoadingStatus } from '../../const/enum';
import { withStore } from '../../mocks/mock-component';

describe('Component: LoadingPage', () => {
  it('should render correct', () => {

    const { withStoreComponent } = withStore(<LoadingPage />, makeFakeStore({
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

    expect(screen.getByTestId('loading-page')).toBeInTheDocument();

  });
});
