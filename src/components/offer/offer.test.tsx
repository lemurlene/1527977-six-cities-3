import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { withStore } from '../../mocks/mock-component';
import Offer from './offer';
import { makeFakeOffer, makeFakeReview, makeFakeStore, makeFakeUser } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const/enum';
import { MemoryRouter } from 'react-router-dom';

const mockOffer = makeFakeOffer({ isFavorite: true });
const mockComments = [makeFakeReview(), makeFakeReview()];
const mockOffersNear = [makeFakeOffer(), makeFakeOffer()];

describe('Offer component', () => {
  const { withStoreComponent } = withStore(
    <MemoryRouter>
      <Offer
        offer={mockOffer}
        comments={mockComments}
        offersNear={mockOffersNear}
        authorizationStatus={AuthorizationStatus.Auth}
      />
    </MemoryRouter>,
    makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUser(),
        isLoadingLogin: false,
        isLoadingLogout: false,
      },
    })
  );
  it('should render all main sections', () => {

    render(withStoreComponent);

    expect(screen.getByTestId('offer-gallery')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });

  it('should display correct offer details', () => {

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${mockOffer.maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    mockOffer.goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should render correct number of images', () => {

    render(withStoreComponent);

    const images = screen.getAllByAltText('Photo studio');
    expect(images.length).toBeLessThanOrEqual(6); // Setting.OffersPhotoCount
  });

  it('should render host info correctly', () => {

    render(withStoreComponent);

    expect(screen.getByAltText('Host avatar')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.host.name)).toBeInTheDocument();
    if (mockOffer.host.isPro) {
      expect(screen.getByText('Pro')).toBeInTheDocument();
    }
  });
});

describe('Offer component NoAuthorization states', () => {
  it('should not render review-form when not authorized', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Offer
          offer={mockOffer}
          comments={mockComments}
          offersNear={mockOffersNear}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
      </MemoryRouter>,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: makeFakeUser(),
          isLoadingLogin: false,
          isLoadingLogout: false,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
  });
});
