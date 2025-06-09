import { render, screen } from '@testing-library/react';
import { withStore } from '../../mocks/mock-component';
import UserInfoMemo from './user-info';
import { makeFakeCard, makeFakeStore, makeFakeUser } from '../../mocks/mocks';
import { AuthorizationStatus, LoadingStatus } from '../../const/enum';

describe('Component: UserInfo', () => {
  const parisOffer = makeFakeCard({ cityKey: 'Paris' });
  const anotherParisOffer = makeFakeCard({ cityKey: 'Paris' });
  const cologneOffer = makeFakeCard({ cityKey: 'Cologne' });

  it('should render correctly with userInfo and favoriteOffers.length > 0', () => {

    const { withStoreComponent } = withStore(
      <UserInfoMemo />,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userInfo: makeFakeUser(),
          isLoadingLogin: false,
          isLoadingLogout: false,
        },
        FAVORITE: {
          favoriteOffers: [parisOffer, anotherParisOffer, cologneOffer],
          isFavoriteOffersLoading: false,
          uploadingFavoriteStatus: LoadingStatus.Idle
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByText('test@test.ru')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should not render email without userInfo and favoriteOffers.length = 0 ', () => {

    const { withStoreComponent } = withStore(
      <UserInfoMemo />,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userInfo: null,
          isLoadingLogin: false,
          isLoadingLogout: false,
        },
        FAVORITE: {
          favoriteOffers: [],
          isFavoriteOffersLoading: false,
          uploadingFavoriteStatus: LoadingStatus.Idle
        }
      })
    );

    render(withStoreComponent);

    expect(screen.queryByTestId('user-email')).not.toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
