import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Reviews from './reviews';
import { SHOW_REVIEWS_COUNT } from './const';
import { makeFakeReview } from '../../mocks/mocks';
import { AuthorizationStatus } from '../../const/enum';
import { withStore } from '../../mocks/mock-component';

vi.mock('./review', () => ({
  default: () => <div data-testid="review-mock">Review Mock</div>
}));

vi.mock('./form-review', () => ({
  default: () => <div data-testid="form-review-mock">Form Review Mock</div>
}));

describe('Reviews component', () => {
  const mockReviews = [
    makeFakeReview({ date: '2024-12-31' }),
    makeFakeReview(),
    makeFakeReview({ date: '2023-12-31' }),

  ];

  it('should render reviews list with correct count', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Reviews
          comments={mockReviews}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
      </MemoryRouter>
    );

    render(withStoreComponent);

    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
    expect(screen.getByText(mockReviews.length.toString())).toBeInTheDocument();

    expect(screen.getAllByTestId('review-mock')).toHaveLength(mockReviews.length);
  });

  it('should sort reviews by date in descending order', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Reviews
          comments={mockReviews}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
      </MemoryRouter>
    );

    render(withStoreComponent);

    const dates = mockReviews.map((review) => review.date).sort((a, b) =>
      new Date(b).getTime() - new Date(a).getTime()
    );

    expect(mockReviews[1].date).toBe(dates[0]);
    expect(mockReviews[0].date).toBe(dates[1]);
    expect(mockReviews[2].date).toBe(dates[2]);
  });

  it('should limit reviews count according to SHOW_REVIEWS_COUNT', () => {
    const manyReviews = Array.from({ length: 10 }, (_, i) =>
      makeFakeReview({ date: `2023-01-${i + 1}` })
    );

    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Reviews
          comments={manyReviews}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
      </MemoryRouter>
    );

    render(withStoreComponent);

    const displayedReviews = screen.getAllByTestId('review-mock');
    expect(displayedReviews.length).toBeLessThanOrEqual(SHOW_REVIEWS_COUNT);
  });

  it('should show form for authenticated users', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Reviews
          comments={mockReviews}
          authorizationStatus={AuthorizationStatus.Auth}
        />
      </MemoryRouter>
    );

    render(withStoreComponent);
    expect(screen.getByTestId('form-review-mock')).toBeInTheDocument();
  });

  it('should not show form for unauthenticated users', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Reviews
          comments={mockReviews}
          authorizationStatus={AuthorizationStatus.NoAuth}
        />
      </MemoryRouter>
    );

    render(withStoreComponent);
    expect(screen.queryByTestId('form-review-mock')).not.toBeInTheDocument();
  });
});
