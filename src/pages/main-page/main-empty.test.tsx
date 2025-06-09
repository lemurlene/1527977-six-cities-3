import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render coorect', () => {
    const mainEmptyId = 'main-empty';
    const city = 'Paris';
    render(<MainEmpty currentCity={city} />);

    expect(screen.getByTestId(mainEmptyId)).toBeInTheDocument();
  });
});

