import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../mocks/mock-component';
import BookmarkMemo from '.';
import { makeFakeOffer, extractActionsTypes, makeFakeStore, makeFakeUser } from '../../mocks/mocks';
import { AuthorizationStatus, APIRoute } from '../../const/enum';
import { changeFavoriteStatus } from '../../store/api-action';

describe('Component: BookmarkButton', () => {
  const mockOffer = makeFakeOffer(false);

  it('should render correct', () => {
    const { withStoreComponent } = withStore(<BookmarkMemo offerId={mockOffer.id} isFavorite={mockOffer.isFavorite} />, makeFakeStore());
    render(withStoreComponent, { wrapper: BrowserRouter });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch changeFavoriteStatus when user clicked button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<BookmarkMemo offerId={mockOffer.id} isFavorite={mockOffer.isFavorite} />, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUser(),
        isLoadingLogin: false,
        isLoadingLogout: false,
      }
    }));
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockOffer.id}/1`).reply(200, mockOffer);

    render(withStoreComponent, { wrapper: BrowserRouter });
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      changeFavoriteStatus.pending.type,
      changeFavoriteStatus.fulfilled.type,
    ]);

  });
});
