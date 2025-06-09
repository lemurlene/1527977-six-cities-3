import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import ErrorServer from '.';
import { AppRoute } from '../../const/enum';

describe('Component: ErrorServer', () => {
  it('should render correctly with default props', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ErrorServer />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('6 cities: Error server');
    });

    expect(screen.getByTestId('error-server')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Вернуться на главную/i })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Root);
  });

  it('should render correctly when mainPage is true', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ErrorServer mainPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId('error-server')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Вернуться на главную/i })).not.toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ErrorServer />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('main')).toHaveClass('page__main--index-empty');
    expect(screen.getByTestId('error-server')).toHaveClass('cities__no-places');
  });
});
