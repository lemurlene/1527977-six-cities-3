import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RatingStars from './rating-stars';

describe('RatingStars component', () => {
  it('should render with correct rating width', () => {
    const testRating = 3;
    render(<RatingStars rating={testRating} classPrefix="test" />);

    const starsElement = screen.getByTestId('rating-stars');
    const widthSpan = starsElement.querySelector('span[style]');

    expect(widthSpan).toHaveStyle('width: 60%'); // 3 * 20 = 60%
    expect(starsElement).toHaveClass('rating test__rating');
  });

  it('should show rating value when isOffer is true', () => {
    const testRating = 4.2;
    render(<RatingStars rating={testRating} classPrefix="offer" isOffer />);

    expect(screen.getByText(testRating.toString())).toBeInTheDocument();
    expect(screen.getByTestId('rating-stars')).toHaveClass('rating offer__rating');
  });

  it('should not show rating value when isOffer is false', () => {
    const testRating = 4.2;
    render(<RatingStars rating={testRating} classPrefix="card" />);

    expect(screen.queryByText(testRating.toString())).not.toBeInTheDocument();
  });

  it('should render correctly with different class prefixes', () => {
    const { rerender } = render(
      <RatingStars rating={3} classPrefix="test-prefix" />
    );
    expect(screen.getByTestId('rating-stars')).toHaveClass('test-prefix__rating');

    rerender(<RatingStars rating={3} classPrefix="another-prefix" />);
    expect(screen.getByTestId('rating-stars')).toHaveClass('another-prefix__rating');
  });
});
