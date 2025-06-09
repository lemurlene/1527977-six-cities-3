import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoginPage from './login-page';
import { makeFakeCard, makeFakeStore } from '../../mocks/mocks';
import { LoadingStatus } from '../../const/enum';
import { withStore } from '../../mocks/mock-component';

describe('Component: LoginPage', () => {
  it('should render correct', () => {

    const { withStoreComponent } = withStore(<LoginPage />, makeFakeStore({
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

    expect(screen.getByTestId('login-page')).toBeInTheDocument();

  });
});
