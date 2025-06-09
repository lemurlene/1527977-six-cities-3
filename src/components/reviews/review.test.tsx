import { render, screen } from '@testing-library/react';
import Review from './review';
import { describe, it, expect } from 'vitest';
import { makeFakeReview } from '../../mocks/mocks';

vi.mock('./utils', () => ({
  formatedDate: () => 'May 2025',
}));

vi.mock('../rating-stars', () => ({
  default: (props: { rating: number }) => <div data-testid="rating-stars">{props.rating}</div>,
}));

const sampleReview = makeFakeReview();

describe('Review component', () => {
  it('should render correctly', () => {
    render(<Review {...sampleReview} />);

    expect(screen.getByText(sampleReview.user.name)).toBeInTheDocument();

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toBeInstanceOf(HTMLImageElement);

    if (avatar instanceof HTMLImageElement) {
      expect(avatar.src).toBe(sampleReview.user.avatarUrl);
      expect(avatar.width).toBe(54);
      expect(avatar.height).toBe(54);
    }

    expect(screen.getByText(sampleReview.comment)).toBeInTheDocument();
    expect(screen.getByTestId('rating-stars')).toHaveTextContent(String(sampleReview.rating));
    expect(screen.getByText('May 2025')).toBeInTheDocument();
    expect(screen.getByText('May 2025').closest('time')).toHaveAttribute('dateTime', sampleReview.date);
  });
});
