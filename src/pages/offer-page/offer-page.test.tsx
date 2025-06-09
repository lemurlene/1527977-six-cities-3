import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { withStore } from '../../mocks/mock-component';
import OfferPage from '.';
import { makeFakeOffer, makeFakeCard, makeFakeStore, makeFakeReview } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const/enum';

describe('Component: OfferPage', () => {
  it('should render correctly when data is loaded', () => {
    const store = makeFakeStore({
      OFFER: {
        offer: makeFakeOffer(),
        isLoadingOffer: false,
        isErrorConnectionOffer: false,
      },
      OFFERS_NEAR: {
        offersNear: [makeFakeCard()],
        isLoadingOffersNear: false,
        isErrorConnectionOffers: false,
      },
      REVIEWS: {
        offerComments: [makeFakeReview()],
        isLoadingComments: false,
        isLoadingComment: false,
      },
    });

    const { withStoreComponent } = withStore(<OfferPage authorizationStatus={AuthorizationStatus.Auth} />, store);

    render(
      <BrowserRouter>
        <HelmetProvider>
          {withStoreComponent}
        </HelmetProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('offer')).toBeInTheDocument();
    expect(screen.getByTestId('offers-near')).toBeInTheDocument();
  });

  it('should render loading when loading', () => {
    const store = makeFakeStore({
      OFFER: {
        offer: null,
        isLoadingOffer: true,
        isErrorConnectionOffer: false,
      },
      OFFERS_NEAR: {
        offersNear: [],
        isLoadingOffersNear: true,
        isErrorConnectionOffers: false,
      },
      REVIEWS: {
        offerComments: [],
        isLoadingComments: false,
        isLoadingComment: false,
      },
    });

    const { withStoreComponent } = withStore(<OfferPage authorizationStatus={AuthorizationStatus.Auth} />, store);

    render(
      <BrowserRouter>
        <HelmetProvider>
          {withStoreComponent}
        </HelmetProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('loading-page')).toBeInTheDocument();
  });

  it('should render NotFoundPage if offer is null', () => {
    const store = makeFakeStore({
      OFFER: {
        offer: null,
        isLoadingOffer: false,
        isErrorConnectionOffer: false,
      },
      OFFERS_NEAR: {
        offersNear: [],
        isLoadingOffersNear: false,
        isErrorConnectionOffers: false,
      },
      REVIEWS: {
        offerComments: [],
        isLoadingComments: false,
        isLoadingComment: false,
      },
    });

    const { withStoreComponent } = withStore(<OfferPage authorizationStatus={AuthorizationStatus.Auth} />, store);

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
