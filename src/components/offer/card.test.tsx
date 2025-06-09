import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation, matchPath } from 'react-router-dom';
import type { PathMatch } from 'react-router-dom';
import Card from './card';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AppRoute } from '../../const/enum';
import { DefaultCardSize } from './const';
import { makeFakeCard } from '../../mocks/mocks';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: AppRoute.Root,
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    })),
    matchPath: vi.fn(),
  };
});

vi.mock('../bookmark', () => ({
  __esModule: true,
  default: ({ isFavorite }: { isFavorite: boolean }) => (
    <div data-testid="bookmark" data-active={isFavorite}>
      BookmarkMock
    </div>
  ),
}));

vi.mock('../rating-stars', () => ({
  __esModule: true,
  default: ({ rating }: { rating: number }) => (
    <div>RatingStarsMock: {rating}</div>
  ),
}));

describe('Card Component', () => {
  const mockCard = makeFakeCard();
  const mockMatch: PathMatch<string> = {
    params: { id: '1' },
    pathname: '/offer/1',
    pathnameBase: '/offer/1',
    pattern: { path: '/offer/:id', end: true, caseSensitive: false }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocation).mockReturnValue({
      pathname: AppRoute.Root,
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });
    vi.mocked(matchPath).mockReturnValue(null);
  });

  it('should render all card content correctly', () => {
    render(
      <MemoryRouter>
        <Card card={mockCard} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockCard.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockCard.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockCard.type)).toBeInTheDocument();
    expect(screen.getByTestId('bookmark')).toBeInTheDocument();
    expect(screen.getByText(`RatingStarsMock: ${mockCard.rating}`)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', mockCard.previewImage);
  });

  it('should apply correct classes for favorites page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: AppRoute.Favorites,
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });

    render(
      <MemoryRouter>
        <Card card={mockCard} />
      </MemoryRouter>
    );

    const article = screen.getByRole('article');
    expect(article).toHaveClass('favorites__card place-card');
    expect(article.querySelector('.place-card__info')).toHaveClass(
      'place-card__info favorites__card-info'
    );
  });

  it('should apply correct classes for offer page', () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/offer/1',
      search: '',
      hash: '',
      state: null,
      key: 'testKey',
    });
    vi.mocked(matchPath).mockReturnValue(mockMatch);

    render(
      <MemoryRouter>
        <Card card={mockCard} />
      </MemoryRouter>
    );

    const article = screen.getByRole('article');
    expect(article).toHaveClass('near-places__card place-card');
  });

  it('should use default size when not provided', () => {
    render(
      <MemoryRouter>
        <Card card={mockCard} />
      </MemoryRouter>
    );

    const img = screen.getByAltText('Place image');
    expect(img).toHaveAttribute('width', DefaultCardSize.width.toString());
    expect(img).toHaveAttribute('height', DefaultCardSize.height.toString());
  });

  it('should use custom size when provided', () => {
    const customSize = { width: 200, height: 150 };
    render(
      <MemoryRouter>
        <Card card={mockCard} size={customSize} />
      </MemoryRouter>
    );

    const img = screen.getByAltText('Place image');
    expect(img).toHaveAttribute('width', customSize.width.toString());
    expect(img).toHaveAttribute('height', customSize.height.toString());
  });
});
