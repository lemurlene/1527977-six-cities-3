import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import FormLogin from './form-login';
import { withStore } from '../../mocks/mock-component';
import { makeFakeStore, makeFakeUser } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const/enum';

describe('FormLogin component', () => {
  it('should disable inputs when loading', () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userInfo: null,
        isLoadingLogin: true,
        isLoadingLogout: false,
      }
    });

    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormLogin />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);

    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeDisabled();

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeDisabled();

    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    expect(submitButton).toBeDisabled();
  });

  it('should enable inputs when not loading', () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userInfo: null,
        isLoadingLogin: false,
        isLoadingLogout: false,
      }
    });

    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <FormLogin />
      </MemoryRouter>,
      initialState
    );

    render(withStoreComponent);

    expect(screen.getByPlaceholderText('Email')).not.toBeDisabled();
    expect(screen.getByPlaceholderText('Password')).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Sign in' })).not.toBeDisabled();
  });

  it('should submit form with correct data', async () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userInfo: null,
        isLoadingLogin: false,
        isLoadingLogout: false,
      }
    });

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <MemoryRouter>
        <FormLogin />
      </MemoryRouter>,
      initialState
    );

    mockAxiosAdapter.onPost('/login').reply(200, { data: makeFakeUser() });

    render(withStoreComponent);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      const actions = mockStore.getActions();
      const loginAction = actions.find((a: { type: string }) => a.type.includes('login/pending'));
      expect(loginAction).toBeDefined();

      const loginCall = mockAxiosAdapter.history.post.find((call) =>
        call.url?.includes('/login')
      );

      expect(loginCall?.data).toEqual(
        JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      );
    });
  });

  it('should navigate to root after successful login', async () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userInfo: null,
        isLoadingLogin: false,
        isLoadingLogout: false,
      }
    });

    const { withStoreComponent, mockAxiosAdapter } = withStore(
      <MemoryRouter initialEntries={['/login']}>
        <FormLogin />
      </MemoryRouter>,
      initialState
    );

    mockAxiosAdapter.onPost('/login').reply(200, { data: makeFakeUser() });

    render(withStoreComponent);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});
