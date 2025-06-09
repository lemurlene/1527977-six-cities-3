import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore, makeFakeUser } from '../../mocks/mocks';
import HeaderNavMemo from './header-nav';
import { AuthorizationStatus, AppRoute } from '../../const/enum';

describe('HeaderNav Component', () => {
  it('should render sign in link when user is not authenticated', () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
        isLoadingLogin: false,
        isLoadingLogout: false,
      }
    });

    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <HeaderNavMemo authorizationStatus={AuthorizationStatus.NoAuth} />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i }))
      .toHaveAttribute('href', AppRoute.Login);
  });

  it('should render user info and sign out link when user is authenticated', () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUser(),
        isLoadingLogin: false,
        isLoadingLogout: false,
      }
    });

    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <HeaderNavMemo authorizationStatus={AuthorizationStatus.Auth} />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign out/i }))
      .toHaveAttribute('href', AppRoute.Root);
  });

  it('should dispatch logout action when sign out is clicked', async () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: makeFakeUser(),
        isLoadingLogin: false,
        isLoadingLogout: false,
      }
    });

    const { withStoreComponent, mockStore } = withStore(
      <MemoryRouter>
        <HeaderNavMemo authorizationStatus={AuthorizationStatus.Auth} />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByText('Sign out'));

    const actions = mockStore.getActions();
    expect(actions.some((action) => (action.type as string).includes('logout/pending')))
      .toBeTruthy();
  });

  it('should not dispatch logout action when not authenticated', () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
        isLoadingLogin: false,
        isLoadingLogout: false,
      }
    });

    const { withStoreComponent, mockStore } = withStore(
      <MemoryRouter>
        <HeaderNavMemo authorizationStatus={AuthorizationStatus.NoAuth} />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);
    expect(mockStore.getActions()).toEqual([]);
  });
});
