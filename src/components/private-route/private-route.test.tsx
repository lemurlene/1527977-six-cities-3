import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const/enum';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) =>
      <div data-testid="navigate-mock">{`Redirect to ${to}`}</div>
  };
});

describe('PrivateRoute component', () => {
  const TestComponent = () => <div data-testid="test-content">Test Content</div>;

  it('should redirect to login when not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <TestComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
    expect(screen.getByText(/Redirect to \/login/)).toBeInTheDocument();
  });

  it('should render children when authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <TestComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.queryByText(/Redirect to/)).not.toBeInTheDocument();
  });

  it('should redirect to root when isReverse and authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
                isReverse
              >
                <TestComponent />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
    expect(screen.getByText(/Redirect to \//)).toBeInTheDocument();
  });

  it('should render children when isReverse and not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
                isReverse
              >
                <TestComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.queryByText(/Redirect to/)).not.toBeInTheDocument();
  });
});
