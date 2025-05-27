import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render coorect', () => {
    const favoritesEmptyId = 'favorites-empty';
    render(<FavoritesEmpty />);

    expect(screen.getByTestId(favoritesEmptyId)).toBeInTheDocument();
  });
});
