import { render, screen } from '@testing-library/react';
import BookmarkMemo from '.';
import { makeFakeCard } from '../../mock';

describe('Component: BookmarkButton', () => {
  it('should render correct', () => {
    const expectedIsFavorite = false;
    const mockOffer = makeFakeCard(false);

    render(<BookmarkMemo offerId={mockOffer.id} isFavorite={expectedIsFavorite} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
