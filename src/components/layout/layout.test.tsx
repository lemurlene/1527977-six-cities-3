import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Layout from './layout';
import { AppRoute, AuthorizationStatus } from '../../const/enum';
import HeaderNavMemo from './header-nav';

vi.mock('./header-logo', () => ({
  default: () => <div>HeaderLogoMock</div>,
}));

vi.mock('./header-nav', () => ({
  default: vi.fn(() => <div>HeaderNavMock</div>),
}));

vi.mock('./footer', () => ({
  default: () => <div>FooterMock</div>,
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    Outlet: () => <div>OutletMock</div>,
    useLocation: vi.fn(),
  };
});

describe('Component: Layout', () => {
  const mockUseLocation = vi.mocked(useLocation);

  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      pathname: AppRoute.Root,
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });
  });

  it('should render correctly for main page', () => {
    mockUseLocation.mockReturnValueOnce({
      pathname: AppRoute.Root,
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });

    render(
      <MemoryRouter initialEntries={[AppRoute.Root]}>
        <Layout authorizationStatus={AuthorizationStatus.Auth} />
      </MemoryRouter>
    );

    expect(screen.getByText('HeaderLogoMock')).toBeInTheDocument();
    expect(screen.getByText('HeaderNavMock')).toBeInTheDocument();
    expect(screen.getByText('OutletMock')).toBeInTheDocument();
    expect(screen.queryByText('FooterMock')).not.toBeInTheDocument();
    expect(screen.getByTestId('layout')).toHaveClass('page page--gray page--main');
  });

  it('should render correctly for login page', () => {
    mockUseLocation.mockReturnValueOnce({
      pathname: AppRoute.Login,
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });

    render(
      <MemoryRouter initialEntries={[AppRoute.Login]}>
        <Layout authorizationStatus={AuthorizationStatus.NoAuth} />
      </MemoryRouter>
    );

    expect(screen.getByText('HeaderLogoMock')).toBeInTheDocument();
    expect(screen.queryByText('HeaderNavMock')).not.toBeInTheDocument();
    expect(screen.getByText('OutletMock')).toBeInTheDocument();
    expect(screen.queryByText('FooterMock')).not.toBeInTheDocument();
    expect(screen.getByTestId('layout')).toHaveClass('page page--gray page--login');
  });

  it('should pass authorizationStatus to HeaderNav', () => {
    mockUseLocation.mockReturnValueOnce({
      pathname: AppRoute.Root,
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });

    const MockHeaderNav = vi.mocked(HeaderNavMemo);
    MockHeaderNav.mockImplementationOnce(({ authorizationStatus }) => (
      <div>HeaderNavMock with status: {authorizationStatus}</div>
    ));

    render(
      <MemoryRouter initialEntries={[AppRoute.Root]}>
        <Layout authorizationStatus={AuthorizationStatus.Auth} />
      </MemoryRouter>
    );

    expect(screen.getByText(/HeaderNavMock with status: AUTH/i)).toBeInTheDocument();
  });
});
