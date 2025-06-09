import { render, screen } from '@testing-library/react';
import OffersCaptionMemo from './offers-caption';

test('renders correct caption for multiple offers', () => {
  render(<OffersCaptionMemo offersCount={3} cityName="Paris" />);

  const caption = screen.getByText('3 places to stay in Paris');
  expect(caption).toBeInTheDocument();
});

test('renders correct caption for single offer', () => {
  render(<OffersCaptionMemo offersCount={1} cityName="Brussels" />);

  const caption = screen.getByText('1 place to stay in Brussels');
  expect(caption).toBeInTheDocument();
});
